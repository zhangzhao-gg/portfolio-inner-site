import React, { useEffect, useRef, useState } from 'react';
import Colors from '../../constants/colors';
import qqNotificationSound from '../../assets/audio/qq-notification.mp3';
import Window from '../os/Window';

export interface QQChatProps extends WindowAppProps {}

type ChatMessage = {
    id: number;
    from: 'me' | 'zhangzhao' | 'system';
    text: string;
    time: string;
    copyWechat?: boolean;
};

const WECHAT_ID = 'Violet6i6';

const REPLIES = [
    { delay: 4200, text: '有意思' },
    {
        delay: 8500,
        text: '我们这地方有地方太千禧年了，我们整点现代的，你要不要加我微信',
    },
    { delay: 12400, text: `我微信 ${WECHAT_ID}，加我`, copyWechat: true },
];

const FRIENDS_WIDTH = 300;
const FRIENDS_HEIGHT = 560;
const CHAT_WIDTH = 560;
const CHAT_HEIGHT = 500;

const getTime = () => {
    const date = new Date();
    return [date.getHours(), date.getMinutes(), date.getSeconds()]
        .map((value) => `${value}`.padStart(2, '0'))
        .join(':');
};

const QQChat: React.FC<QQChatProps> = (props) => {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            from: 'zhangzhao',
            text: '你想成为什么样的人',
            time: getTime(),
        },
    ]);
    const [draft, setDraft] = useState('');
    const [hasReplied, setHasReplied] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [statusText, setStatusText] = useState('张钊 在线');
    const [openingChat, setOpeningChat] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const timersRef = useRef<number[]>([]);
    const idlePromptTimerRef = useRef<number>();
    const openChatTimerRef = useRef<number>();
    const audioRef = useRef<HTMLAudioElement>();

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, [messages]);

    useEffect(() => {
        const timers = timersRef.current;
        return () => {
            timers.forEach((timer) => window.clearTimeout(timer));
            idlePromptTimerRef.current &&
                window.clearTimeout(idlePromptTimerRef.current);
            openChatTimerRef.current &&
                window.clearTimeout(openChatTimerRef.current);
        };
    }, []);

    const playNotification = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio(qqNotificationSound);
            audioRef.current.volume = 0.55;
        }
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
    };

    useEffect(() => {
        playNotification();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!chatOpen || hasReplied) return;
        idlePromptTimerRef.current = window.setTimeout(() => {
            setMessages((current) => [
                ...current,
                {
                    id: Date.now(),
                    from: 'zhangzhao',
                    text: '你想成为什么样的人？ 我想听听你的想法',
                    time: getTime(),
                },
            ]);
            playNotification();
        }, 10000);

        return () => {
            idlePromptTimerRef.current &&
                window.clearTimeout(idlePromptTimerRef.current);
        };
    }, [chatOpen, hasReplied]);

    const addSystemMessage = (text: string) => {
        setIsTyping(false);
        setStatusText(text);
        setMessages((current) => [
            ...current,
            { id: Date.now(), from: 'system', text, time: getTime() },
        ]);
    };

    const copyWechat = async () => {
        try {
            await navigator.clipboard.writeText(WECHAT_ID);
            addSystemMessage(`已复制微信号 ${WECHAT_ID}`);
        } catch {
            setDraft((current) => `${current}${WECHAT_ID}`);
            addSystemMessage('浏览器不允许自动复制，已放入输入框。');
        }
    };

    const scheduleReplies = () => {
        const typingTimer = window.setTimeout(() => {
            setIsTyping(true);
        }, 1000);
        timersRef.current.push(typingTimer);

        REPLIES.forEach((reply, index) => {
            const preTypingTimer = window.setTimeout(() => {
                setIsTyping(true);
            }, Math.max(1000, reply.delay - 1400));

            const replyTimer = window.setTimeout(() => {
                setIsTyping(false);
                playNotification();
                setMessages((current) => [
                    ...current,
                    {
                        id: Date.now() + index,
                        from: 'zhangzhao',
                        text: reply.text,
                        time: getTime(),
                        copyWechat: reply.copyWechat,
                    },
                ]);
                setStatusText(
                    index === REPLIES.length - 1 ? '张钊 在线' : '消息已收到'
                );
            }, reply.delay);

            timersRef.current.push(preTypingTimer, replyTimer);
        });
    };

    const notifyOwner = (message: string) => {
        fetch('/api/notify-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                page: window.location.href,
                sentAt: new Date().toISOString(),
            }),
        }).catch(() => {});
    };

    const sendMessage = () => {
        const text = draft.trim();
        if (!text) return;
        idlePromptTimerRef.current &&
            window.clearTimeout(idlePromptTimerRef.current);

        setMessages((current) => [
            ...current,
            { id: Date.now(), from: 'me', text, time: getTime() },
        ]);
        setDraft('');
        setStatusText('消息已送达');
        notifyOwner(text);

        if (!hasReplied) {
            setHasReplied(true);
            scheduleReplies();
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    const openChat = () => {
        setOpeningChat(true);
        openChatTimerRef.current = window.setTimeout(() => {
            setChatOpen(true);
            setOpeningChat(false);
        }, 180);
    };

    const getCenteredPosition = (width: number, height: number) => ({
        top:
            typeof window === 'undefined'
                ? 96
                : Math.max(24, Math.floor((window.innerHeight - height) / 2)),
        left:
            typeof window === 'undefined'
                ? 96
                : Math.max(24, Math.floor((window.innerWidth - width) / 2)),
    });

    const friendsPosition = getCenteredPosition(FRIENDS_WIDTH, FRIENDS_HEIGHT);
    const chatPosition = getCenteredPosition(CHAT_WIDTH, CHAT_HEIGHT);

    return (
        <>
            <Window
                top={friendsPosition.top}
                left={friendsPosition.left}
                width={FRIENDS_WIDTH}
                height={FRIENDS_HEIGHT}
                windowTitle="QQ - 我的好友"
                windowBarIcon="qqIcon"
                closeWindow={props.onClose}
                onInteract={props.onInteract}
                minimizeWindow={props.onMinimize}
                bottomLeftText="OICQ: 20862022"
            >
                <div style={styles.friendsShell}>
                    <div style={styles.profileHeader}>
                        <div style={styles.qqAvatar}>张</div>
                        <div style={styles.profileText}>
                            <p style={styles.profileName}>张钊</p>
                            <p style={styles.profileStatus}>
                                在线 / OICQ 20862022
                            </p>
                        </div>
                    </div>
                    <div style={styles.friendGroupTitle}>我的好友 [1/1]</div>
                    <button
                        className="qq-friend-row"
                        style={Object.assign(
                            {},
                            styles.friendRow,
                            openingChat && styles.friendRowOpening
                        )}
                        onClick={openChat}
                    >
                        <div style={styles.friendIcon}>张</div>
                        <div style={styles.friendInfo}>
                            <p style={styles.friendName}>张钊</p>
                            <p style={styles.friendRemark}>
                                给你发来了一条消息
                            </p>
                        </div>
                    </button>
                    <div style={styles.friendActions}>
                        <button
                            className="qq-button"
                            style={styles.actionButton}
                            onClick={openChat}
                        >
                            {openingChat ? '正在打开...' : '发送消息'}
                        </button>
                    </div>
                </div>
            </Window>

            {chatOpen && (
                <Window
                    top={chatPosition.top}
                    left={chatPosition.left}
                    width={CHAT_WIDTH}
                    height={CHAT_HEIGHT}
                    windowTitle="张钊 - 发送消息"
                    windowBarIcon="qqIcon"
                    closeWindow={() => setChatOpen(false)}
                    onInteract={props.onInteract}
                    minimizeWindow={props.onMinimize}
                    bottomLeftText="OICQ: 20862022"
                >
                <div style={styles.chatShell}>
                <div style={styles.userPanel}>
                    <div style={styles.userGrid}>
                        <label style={styles.fieldLabel}>OICQ#:</label>
                        <div style={styles.fieldValue}>20862022</div>
                        <label style={styles.fieldLabel}>昵称:</label>
                        <div style={styles.fieldValue}>张钊</div>
                        <label style={styles.fieldLabel}>微信:</label>
                        <button
                            className="qq-button"
                            style={styles.copyField}
                            onClick={copyWechat}
                        >
                            {WECHAT_ID}
                        </button>
                    </div>
                    <div style={styles.detailsLink}>用户详细资料-&gt;</div>
                    <div style={styles.avatarFace}>张</div>
                </div>

                <div style={styles.sectionHeader}>
                    <span style={styles.sectionLabel}>消息内容</span>
                    {isTyping && (
                        <span style={styles.typingStatus}>
                            张钊 正在输入...
                        </span>
                    )}
                </div>
                <div ref={scrollRef} style={styles.messages}>
                    {messages.map((message) => (
                        <div key={message.id} style={styles.messageBlock}>
                            <div
                                style={Object.assign(
                                    {},
                                    styles.messageMeta,
                                    styles[`${message.from}Meta`]
                                )}
                            >
                                {message.from === 'system'
                                    ? '系统消息'
                                    : message.from === 'me'
                                    ? '我'
                                    : '张钊'}{' '}
                                {message.time}
                            </div>
                            <p style={styles.messageText}>{message.text}</p>
                            {message.copyWechat && (
                                <button
                                    className="qq-button"
                                    style={styles.inlineCopyButton}
                                    onClick={copyWechat}
                                >
                                    复制微信号
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div style={styles.statusBar}>
                    <span style={styles.statusText}>{statusText}</span>
                </div>
                <div style={styles.composer}>
                    <textarea
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={onKeyDown}
                        style={styles.textarea}
                        autoFocus
                    />
                </div>
                <div style={styles.actionBar}>
                    <button
                        style={styles.actionButton}
                        className="qq-button"
                        onClick={() => {
                            setDraft('');
                            setStatusText('已取消当前输入');
                        }}
                    >
                        取消发送
                    </button>
                    <button
                        className="qq-button"
                        style={styles.primaryButton}
                        onClick={sendMessage}
                    >
                        发送讯息
                    </button>
                </div>
            </div>
                </Window>
            )}
        </>
    );
};

const insetBorder = {
    border: `1px solid ${Colors.white}`,
    borderTopColor: Colors.darkGray,
    borderLeftColor: Colors.darkGray,
};

const buttonBorder = {
    border: `1px solid ${Colors.black}`,
    borderTopColor: Colors.white,
    borderLeftColor: Colors.white,
};

const styles: StyleSheetCSS = {
    friendsShell: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: Colors.lightGray,
        padding: 6,
        boxSizing: 'border-box',
    },
    profileHeader: {
        height: 64,
        alignItems: 'center',
        padding: 8,
        boxSizing: 'border-box',
        backgroundColor: '#5f84c9',
        ...insetBorder,
    },
    qqAvatar: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffe46b',
        border: `1px solid ${Colors.black}`,
        fontFamily: 'Terminal',
        fontSize: 20,
        marginRight: 8,
    },
    profileText: {
        flexDirection: 'column',
    },
    profileName: {
        margin: 0,
        fontFamily: 'MSSerif',
        fontSize: 16,
        color: Colors.white,
        fontWeight: 700,
    },
    profileStatus: {
        margin: 0,
        marginTop: 6,
        fontFamily: 'MSSerif',
        fontSize: 12,
        color: Colors.white,
    },
    friendGroupTitle: {
        height: 24,
        alignItems: 'center',
        paddingLeft: 6,
        fontFamily: 'MSSerif',
        fontSize: 12,
        backgroundColor: Colors.lightGray,
    },
    friendRow: {
        height: 48,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 6,
        boxSizing: 'border-box',
        cursor: 'pointer',
        textAlign: 'left',
        ...insetBorder,
    },
    friendRowOpening: {
        backgroundColor: '#c0c0c0',
    },
    friendIcon: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffe46b',
        border: `1px solid ${Colors.black}`,
        fontFamily: 'Terminal',
        marginRight: 8,
    },
    friendInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    friendName: {
        margin: 0,
        fontFamily: 'MSSerif',
        fontSize: 13,
        color: Colors.black,
        lineHeight: '16px',
    },
    friendRemark: {
        margin: 0,
        marginTop: 2,
        fontFamily: 'MSSerif',
        fontSize: 12,
        color: '#555555',
        lineHeight: '15px',
    },
    friendActions: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingTop: 8,
    },
    chatShell: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: Colors.lightGray,
        padding: 6,
        boxSizing: 'border-box',
    },
    userPanel: {
        height: 54,
        alignItems: 'center',
        padding: 4,
        boxSizing: 'border-box',
        backgroundColor: Colors.lightGray,
        ...insetBorder,
    },
    userGrid: {
        display: 'grid',
        gridTemplateColumns: '46px 88px 36px 88px 34px 1fr',
        columnGap: 4,
        alignItems: 'center',
        flex: 1,
    },
    fieldLabel: {
        fontFamily: 'MSSerif',
        fontSize: 12,
    },
    fieldValue: {
        height: 18,
        alignItems: 'center',
        paddingLeft: 4,
        boxSizing: 'border-box',
        backgroundColor: '#f8f8f8',
        fontFamily: 'MSSerif',
        fontSize: 12,
        ...insetBorder,
    },
    copyField: {
        height: 18,
        justifyContent: 'flex-start',
        paddingLeft: 4,
        boxSizing: 'border-box',
        backgroundColor: Colors.white,
        fontFamily: 'MSSerif',
        fontSize: 12,
        cursor: 'pointer',
        ...insetBorder,
    },
    detailsLink: {
        height: 20,
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        fontFamily: 'MSSerif',
        fontSize: 12,
        textDecoration: 'underline',
    },
    avatarFace: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffe46b',
        border: `1px solid ${Colors.black}`,
        fontFamily: 'Terminal',
        fontSize: 18,
    },
    sectionHeader: {
        height: 22,
        alignItems: 'center',
        paddingLeft: 2,
        justifyContent: 'space-between',
    },
    sectionLabel: {
        fontFamily: 'MSSerif',
        fontSize: 12,
    },
    typingStatus: {
        paddingRight: 6,
        fontFamily: 'MSSerif',
        fontSize: 12,
        color: '#555555',
    },
    messages: {
        flex: 1,
        flexDirection: 'column',
        padding: 8,
        overflowY: 'auto',
        boxSizing: 'border-box',
        backgroundColor: Colors.white,
        ...insetBorder,
    },
    messageBlock: {
        flexDirection: 'column',
        marginBottom: 8,
        flexShrink: 0,
    },
    messageMeta: {
        fontFamily: 'MSSerif',
        fontSize: 12,
        lineHeight: '16px',
    },
    zhangzhaoMeta: {
        color: '#008060',
    },
    meMeta: {
        color: '#1b56b1',
    },
    systemMeta: {
        color: '#7b4a00',
    },
    messageText: {
        margin: 0,
        marginLeft: 16,
        fontFamily: 'MSSerif',
        fontSize: 13,
        lineHeight: '18px',
        color: Colors.black,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
    inlineCopyButton: {
        width: 86,
        height: 22,
        marginLeft: 16,
        marginTop: 4,
        backgroundColor: Colors.lightGray,
        fontFamily: 'MSSerif',
        fontSize: 12,
        cursor: 'pointer',
        ...buttonBorder,
    },
    statusBar: {
        height: 26,
        alignItems: 'center',
        backgroundColor: '#5f84c9',
        paddingLeft: 8,
        boxSizing: 'border-box',
    },
    statusText: {
        fontFamily: 'MSSerif',
        fontSize: 12,
        color: Colors.white,
    },
    composer: {
        height: 92,
        boxSizing: 'border-box',
        backgroundColor: Colors.white,
        ...insetBorder,
    },
    textarea: {
        flex: 1,
        resize: 'none',
        border: 'none',
        fontFamily: 'MSSerif',
        fontSize: 13,
        lineHeight: '18px',
        padding: 8,
        outline: 'none',
        backgroundColor: Colors.white,
        boxShadow: 'none',
    },
    actionBar: {
        height: 36,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 6,
        boxSizing: 'border-box',
        gap: 8,
    },
    actionButton: {
        minWidth: 76,
        height: 24,
        backgroundColor: Colors.lightGray,
        fontFamily: 'MSSerif',
        fontSize: 12,
        cursor: 'pointer',
        ...buttonBorder,
    },
    primaryButton: {
        minWidth: 84,
        height: 24,
        backgroundColor: Colors.lightGray,
        fontFamily: 'MSSerif',
        fontSize: 12,
        fontWeight: 700,
        cursor: 'pointer',
        ...buttonBorder,
    },
};

export default QQChat;
