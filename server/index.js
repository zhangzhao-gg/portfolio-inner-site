const fs = require('fs');
const http = require('http');
const path = require('path');
const { execFile } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const buildDir = path.join(rootDir, 'build');

const loadEnv = () => {
    const localEnv = path.join(__dirname, '.env');
    const parentEnv = path.join(rootDir, '.env');
    const envPath = fs.existsSync(localEnv) ? localEnv : parentEnv;
    if (!fs.existsSync(envPath)) return;

    fs.readFileSync(envPath, 'utf8')
        .split(/\r?\n/)
        .forEach((line) => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;
            const eqIndex = trimmed.indexOf('=');
            if (eqIndex === -1) return;
            const key = trimmed.slice(0, eqIndex);
            const value = trimmed
                .slice(eqIndex + 1)
                .replace(/^['"]|['"]$/g, '');
            if (!process.env[key]) process.env[key] = value;
        });
};

loadEnv();

const port = Number(process.env.API_PORT || process.env.PORT || 8787);

const sendJson = (res, status, payload) => {
    res.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
    });
    res.end(JSON.stringify(payload));
};

const readBody = (req) =>
    new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
            if (body.length > 20000) {
                reject(new Error('Payload too large'));
                req.destroy();
            }
        });
        req.on('end', () => resolve(body));
        req.on('error', reject);
    });

const sendResendEmail = (payload) =>
    new Promise((resolve, reject) => {
        const args = [
            '-sS',
            '-X',
            'POST',
            'https://api.resend.com/emails',
            '-H',
            `Authorization: Bearer ${process.env.RESEND_API_KEY}`,
            '-H',
            'Content-Type: application/json',
            '--data',
            JSON.stringify(payload),
            '-w',
            '\n%{http_code}',
        ];

        execFile('curl', args, { timeout: 15000 }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }

            const output = stdout.trim();
            const splitIndex = output.lastIndexOf('\n');
            const body = splitIndex === -1 ? output : output.slice(0, splitIndex);
            const status = Number(
                splitIndex === -1 ? 0 : output.slice(splitIndex + 1)
            );
            const json = body ? JSON.parse(body) : {};

            if (status < 200 || status >= 300) {
                reject(
                    new Error(
                        json.message || stderr || `Resend returned ${status}`
                    )
                );
                return;
            }

            resolve(json);
        });
    });

const notifyMessage = async (req, res) => {
    if (
        !process.env.RESEND_API_KEY ||
        !process.env.FROM_EMAIL ||
        !process.env.MAIL_TO
    ) {
        sendJson(res, 500, { error: 'Mail service is not configured' });
        return;
    }

    try {
        const body = JSON.parse(await readBody(req));
        const message = `${body.message || ''}`.trim();
        if (!message) {
            sendJson(res, 400, { error: 'message is required' });
            return;
        }

        const sentAt = body.sentAt || new Date().toISOString();
        const page = body.page || 'unknown';

        const result = await sendResendEmail({
            from: process.env.FROM_EMAIL,
            to: process.env.MAIL_TO,
            subject: 'Portfolio QQ 收到一条新消息',
            text: [
                'Portfolio QQ 收到一条新消息。',
                '',
                `时间: ${sentAt}`,
                `页面: ${page}`,
                '',
                '消息:',
                message.slice(0, 2000),
            ].join('\n'),
        });

        console.log('Mail sent:', result.id);
        sendJson(res, 200, { ok: true, id: result.id });
    } catch (error) {
        console.error(error);
        sendJson(res, 500, {
            error: 'Failed to send email',
            detail: error.message,
        });
    }
};

const serveStatic = (req, res) => {
    const urlPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
    const filePath = path.normalize(path.join(buildDir, urlPath));

    if (!filePath.startsWith(buildDir)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    const fallbackPath = path.join(buildDir, 'index.html');
    const targetPath = fs.existsSync(filePath) ? filePath : fallbackPath;
    const ext = path.extname(targetPath);
    const contentTypes = {
        '.css': 'text/css; charset=utf-8',
        '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.mp3': 'audio/mpeg',
        '.png': 'image/png',
        '.svg': 'image/svg+xml',
        '.wasm': 'application/wasm',
    };

    res.writeHead(200, {
        'Content-Type': contentTypes[ext] || 'application/octet-stream',
    });
    fs.createReadStream(targetPath).pipe(res);
};

const server = http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Origin': '*',
        });
        res.end();
        return;
    }

    if (req.url === '/api/notify-message' && req.method === 'POST') {
        await notifyMessage(req, res);
        return;
    }

    if (fs.existsSync(buildDir)) {
        serveStatic(req, res);
        return;
    }

    sendJson(res, 404, { error: 'Not found' });
});

server.listen(port, () => {
    console.log(`Mail server listening on http://localhost:${port}`);
});
