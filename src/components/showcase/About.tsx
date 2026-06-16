import React from 'react';
import me from '../../assets/pictures/child.jpg';
import meNow from '../../assets/pictures/zz.jpg';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    return (
        <div className="site-page-content">
            <div className="welcome-page">
                <h1 className="welcome-title">Welcome</h1>
                <h3>我是张钊</h3>
                <div className="text-block welcome-intro">
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

                <div className="text-block welcome-story">
                    <h3>关于我</h3>
                    <br />
                    <p>
                        我不是一个纯粹的工程师，而更像一个寻找新大陆的人。技术是我的船，心理学是我的罗盘，而产品则是我理解世界的方式。
                    </p>
                    <br />
                    <p>
                        这种创造的冲动从很小就开始了。小学时我痴迷于发明各种游戏——把游戏王的规则融入普通扑克牌，让每一张牌都能成为被召唤上场的仆从；自创拖车游戏、战斗游戏，在纸上画满了棋盘和战场。那时没有人教我规则，现有的不够玩，那就自己造一个。
                    </p>
                </div>

                <figure className="welcome-child-figure">
                    <img src={me} alt="张钊小时候" />
                    <figcaption>
                        <b>Figure 1:</b> 父亲经常带我玩Dos游戏
                    </figcaption>
                </figure>

                <div className="text-block welcome-story">
                    <p>
                        我的背景来自计算机科学，但真正让我着迷的，是那些尚未被定义的事物：新的社交关系、新的创作方式、新的人机协作模式。我喜欢做实验，喜欢把看似无关的领域连接起来，也接受大多数尝试最终会失败。对我来说，创造并不是为了证明什么，而是为了不断发现那些原本不存在的可能性。
                    </p>
                    <br />
                    <p>
                        我用技术搭建一些小小的数字世界，让人、想法与 AI 能够在其中慢慢生长。
                    </p>
                    <br />
                    <p>
                        2026 年我研三毕业于南京工业大学。2025 年 8 月在云蝠智能实习，参与超大规模 VoiceAgent 系统构建，负责 VAD 模块开发与实时通讯链路优化。2026 年 1 月加入现在北京的 AI 陪伴创业公司，负责大模型记忆层架构设计与上下文工程体系搭建。
                    </p>
                    <br />
                    <p>
                        毕业时拿到了大厂 offer没去。我对当螺丝钉没兴趣——我更想要小团队、真问题、有创造力的环境。我参与了开源项目 memU（1.4w star）的 Go SDK 开发，也参加了 Eazo 全球黑客松并获得了"特别奖"。
                    </p>
                </div>

                <div className="welcome-spacer" />

                <section className="welcome-hobbies">
                    <div className="welcome-hobbies-heading">
                        <h3>兴趣爱好</h3>
                    </div>
                    <div className="welcome-hobbies-grid">
                        <div className="welcome-hobby-copy">
                            <p>
                                我热爱思考性格与命运的关系，于是决定开始系统学习心理咨询精神分析。师从超个人心理学博士肖青，既是她的弟子，也是她的助理。
                            </p>
                            <br />
                            <p>
                                我做个案，带心理成长团体，冥想，茶叙，OH 卡，小物件排列。有来访者感激我陪她走过一段艰难的时光，也有来访者说，这是她第一次看清楚自己命运的细线。
                            </p>
                        </div>
                        <div className="welcome-hobby-side">
                            <img src={meNow} alt="张钊近照" />
                            <p>
                                <sub>
                                    <b>Figure 2:</b> 某天晚上的随手拍
                                </sub>
                            </p>
                        </div>
                    </div>
                    <div className="welcome-hobby-copy welcome-hobby-bottom">
                        <p>
                            做 Inbetween 的时候，我一直在想那些我想深度记录下来，又渴望让另一个人看到的想法和文字。那个人可能是密友，也可能是伴侣。怎么让对方知道我有话想说，但又不是直接把它发送过去。
                        </p>
                        <br />
                        <p>
                            我觉得表达一定要发生在一个松弛的空间里。它应该是安静的，私密的，适合记录的。我很喜欢 Inbetween 里的一个功能：当我写下一些东西并把它设为私密，对方会看到有一封被信封包裹起来的信息，知道它存在，但看不到具体内容。我很喜欢这种感觉。
                        </p>
                        <br />
                        <p>
                            我也喜欢产品设计、游戏设计，以及各种 AI 创作实验。最近在打磨 Inbetween 和 Foreseen，都是小而有意思的东西。
                        </p>
                    </div>
                </section>

                <div className="text-block welcome-footer">
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
        </div>
    );
};

export default About;
