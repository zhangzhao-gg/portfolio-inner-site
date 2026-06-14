import React, { useEffect, useState } from 'react';
import colors from '../../constants/colors';
import ghIcon from '../../assets/pictures/contact-gh.png';
import inIcon from '../../assets/pictures/contact-in.png';
import ResumeDownload from './ResumeDownload';

export interface ContactProps {}

const validateEmail = (email: string) => {
    const re =
        // eslint-disable-next-line
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

interface SocialBoxProps {
    icon: string;
    link: string;
}

const SocialBox: React.FC<SocialBoxProps> = ({ link, icon }) => {
    return (
        <a rel="noreferrer" target="_blank" href={link}>
            <div className="big-button-container" style={styles.social}>
                <img src={icon} alt="" style={styles.socialImage} />
            </div>
        </a>
    );
};

const Contact: React.FC<ContactProps> = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [formMessageColor, setFormMessageColor] = useState('');

    useEffect(() => {
        setIsFormValid(validateEmail(email) && name.length > 0 && message.length > 0);
    }, [email, name, message]);

    function submitForm() {
        if (!isFormValid) {
            setFormMessage('请填写所有必填项。');
            setFormMessageColor('red');
            return;
        }
        // 用 mailto 打开邮件客户端，无需后端
        const subject = encodeURIComponent(`来自 ${name} 的留言`);
        const body = encodeURIComponent(`姓名: ${name}\n邮箱: ${email}\n\n${message}`);
        window.open(`mailto:1730239726@qq.com?subject=${subject}&body=${body}`);
        setFormMessage(`已为你打开邮件客户端，谢谢 ${name}！`);
        setFormMessageColor(colors.blue);
        setName('');
        setEmail('');
        setMessage('');
    }

    useEffect(() => {
        if (formMessage.length > 0) {
            setTimeout(() => {
                setFormMessage('');
                setFormMessageColor('');
            }, 4000);
        }
    }, [formMessage]);

    return (
        <div className="site-page-content">
            <div style={styles.header}>
                <h1>Contact</h1>
                <div style={styles.socials}>
                    <SocialBox
                        icon={ghIcon}
                        link={'https://github.com/zhangzhao-gg'}
                    />
                    <SocialBox
                        icon={inIcon}
                        link={'https://www.xiaohongshu.com/user/profile/5e5f1d2e0000000001002baf'}
                    />
                </div>
            </div>
            <div className="text-block">
                <p>
                    欢迎聊产品、AI、合作或任何有意思的想法。可以直接发邮件，也可以加微信。
                </p>
                <br />
                <p>
                    <b>邮箱：</b>
                    <a href="mailto:1730239726@qq.com">1730239726@qq.com</a>
                </p>
                <p>
                    <b>微信：</b> Violet6i6
                </p>
                <p>
                    <b>GitHub：</b>{' '}
                    <a rel="noreferrer" target="_blank" href="https://github.com/zhangzhao-gg">
                        zhangzhao-gg
                    </a>
                </p>
                <p>
                    <b>小红书：</b>{' '}
                    <a rel="noreferrer" target="_blank" href="https://www.xiaohongshu.com/user/profile/5e5f1d2e0000000001002baf">
                        张钊
                    </a>
                </p>

                <div style={styles.form}>
                    <label>
                        <p>
                            {!name && <span style={styles.star}>*</span>}
                            <b>你的名字：</b>
                        </p>
                    </label>
                    <input
                        style={styles.formItem}
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>
                        <p>
                            {!validateEmail(email) && (
                                <span style={styles.star}>*</span>
                            )}
                            <b>邮箱：</b>
                        </p>
                    </label>
                    <input
                        style={styles.formItem}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>
                        <p>
                            {!message && <span style={styles.star}>*</span>}
                            <b>留言：</b>
                        </p>
                    </label>
                    <textarea
                        name="message"
                        placeholder="Message"
                        style={styles.formItem}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div style={styles.buttons}>
                        <button
                            className="site-button"
                            style={styles.button}
                            type="submit"
                            disabled={!isFormValid}
                            onMouseDown={submitForm}
                        >
                            发送留言
                        </button>
                        <div style={styles.formInfo}>
                            <p style={Object.assign({}, { color: formMessageColor })}>
                                <b>
                                    <sub>
                                        {formMessage
                                            ? formMessage
                                            : '留言会通过邮件客户端直接发送给我'}
                                    </sub>
                                </b>
                            </p>
                            <p>
                                <sub>
                                    {!isFormValid ? (
                                        <span>
                                            <b style={styles.star}>*</b> = 必填
                                        </span>
                                    ) : (
                                        '\xa0'
                                    )}
                                </sub>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ResumeDownload altText="需要我的简历？" />
        </div>
    );
};

const styles: StyleSheetCSS = {
    form: {
        flexDirection: 'column',
        marginTop: 32,
    },
    formItem: {
        marginTop: 4,
        marginBottom: 16,
    },
    socialImage: {
        width: 36,
        height: 36,
    },
    buttons: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    formInfo: {
        textAlign: 'right',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingLeft: 24,
    },
    star: {
        paddingRight: 4,
        color: 'red',
    },
    button: {
        minWidth: 184,
        height: 32,
    },
    header: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    socials: {
        marginBottom: 16,
        justifyContent: 'flex-end',
    },
    social: {
        width: 4,
        height: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
};

export default Contact;
