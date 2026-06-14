import React from 'react';
import me from '../../assets/pictures/child.jpg';
import meNow from '../../assets/pictures/zz.jpg';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1 style={{ marginLeft: -16 }}>Welcome</h1>
            <h3>我是张钊</h3>
            <br />
            <div className="text-block">
                <p>
                    AI 工程师 / Builder，现就职于北京某 AI 陪伴创业公司，专注于构建能够承载人与人情感连接的 AI 产品。
                </p>
                <br />
                <p>
                    感谢你来看我的作品集。如果有任何问题或合作想法，欢迎通过{' '}
                    <Link to="/contact">联系页面</Link> 或直接发邮件到{' '}
                    <a href="mailto:1730239726@qq.com">1730239726@qq.com</a>
                </p>
            </div>
            <ResumeDownload />
            <div className="text-block">
                <h3>关于我</h3>
                <br />
                {/* 第一张图左，文字右 */}
                <div style={styles.imageTextRow}>
                    <div style={styles.leftImageBox}>
                        <img src={me} style={styles.leftImage} alt="" />
                        <p style={{ textAlign: 'center' }}>
                            <sub>
                                <b>Figure 1:</b> 那时候还不知道自己以后要对着屏幕说话
                            </sub>
                        </p>
                    </div>
                    <div style={styles.rightText}>
                        <p>
                            我始终觉得自己不是一个标准的软件工程师，而更像一个寻找新大陆的人。技术是我的船，心理学是我的罗盘，而产品则是我理解世界的方式。
                        </p>
                        <br />
                        <p>
                            这种创造的冲动从很小就开始了。小学时我痴迷于发明各种游戏——把游戏王的规则融入普通扑克牌，让每一张牌都能成为被召唤上场的仆从；自创拖车游戏、战斗游戏，在纸上画满了棋盘和战场。那时没有人教我规则，我只是觉得：现有的不够玩，那就自己造一个。
                        </p>
                        <br />
                        <p>
                            我的背景来自人工智能和计算机研究，但真正让我着迷的，是那些尚未被定义的事物：新的社交关系、新的创作方式、新的人机协作模式。我喜欢做实验，喜欢把看似无关的领域连接起来，也接受大多数尝试最终会失败。对我来说，创造并不是为了证明什么，而是为了不断发现那些原本不存在的可能性。
                        </p>
                        <br />
                        <p>
                            我用技术搭建一些小小的数字世界，让人、想法与 AI 能够在其中慢慢生长。
                        </p>
                    </div>
                </div>
                <br />
                <p>
                    2026 年研三毕业于南京工业大学计算机科学与技术，研究方向是深度学习与图像超分辨率。2025 年 8 月在云蝠智能实习，参与超大规模 VoiceAgent 系统构建，负责 VAD 模块开发与实时通讯链路优化。2026 年 1 月加入北京一家 AI 陪伴创业公司，负责大模型记忆层架构设计与上下文工程体系搭建。
                </p>
                <br />
                <p>
                    毕业时拿到了大厂 offer，但没去。我对当螺丝刀没兴趣——我更想要小团队、真问题、有创造力的环境。参与了开源项目 memU（1.4w star）的 Go SDK 开发，也参加了 Eazo 全球黑客松并获得了"特别奖"。
                </p>
                <br />
                {/* 第二张图靠右，文字靠左 */}
                <div style={styles.imageTextRow}>
                    <div style={styles.rightText}>
                        <p>
                            工作之外，我在 2025 年 1 月开始了长程心理咨询培训，并做了一年的疗愈师。擅长精神分析，会 OH 卡和小物件排列。我是 ENFJ-A，喜欢鼓励身边的人，喜欢看到他们慢慢变好——那种万物生长的感觉让我觉得一切都值得。
                        </p>
                        <br />
                        <p>
                            这也是为什么我会做 Inbetween 这样的产品。不是因为技术，而是因为我真的相信：人与人之间安静的连接，是这个时代最稀缺的东西。
                        </p>
                        <br />
                        <p>
                            工作之外还喜欢产品设计、游戏设计，以及各种 AI 创作实验。最近在打磨 Inbetween 和 Foreseen，都是小而有意思的东西。
                        </p>
                    </div>
                    <div style={{ flexDirection: 'column', alignItems: 'center', flexShrink: 0, marginLeft: 24, width: 320, alignSelf: 'flex-start' as const }}>
                        <img src={meNow} style={styles.soloImage} alt="" />
                        <p>
                            <sub>
                                <b>Figure 2:</b> 某天晚上的随手拍
                            </sub>
                        </p>
                    </div>
                </div>
                <br />
                <br />
                <p>
                    如果你有问题或想聊合作，可以在{' '}
                    <Link to="/contact">联系页面</Link> 找到我，或者发邮件到{' '}
                    <a href="mailto:1730239726@qq.com">1730239726@qq.com</a>
                </p>
                <br />
                <p style={{ fontSize: 12, color: '#888' }}>
                    本站基于{' '}
                    <a rel="noreferrer" target="_blank" href="https://github.com/henryjeff">Henry Heffernan</a>
                    {' '}的开源项目二次开发
                </p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    imageTextRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: 16,
    },
    leftImageBox: {
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
        marginRight: 24,
        width: 220,
    },
    leftImage: {
        width: 220,
        height: 'auto',
    },
    rightText: {
        flex: 1,
        flexDirection: 'column',
        textAlign: 'justify',
        fontSize: 15,
    },
    rightImageBox: {
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
        marginLeft: 24,
        marginTop: 0,
        width: 320,
        alignSelf: 'flex-start',
    },
    soloImage: {
        width: 320,
        height: 'auto',
    },
};

export default About;
