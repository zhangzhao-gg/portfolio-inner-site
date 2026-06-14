import React from 'react';
import ResumeDownload from '../ResumeDownload';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Software</h1>
            <h3>Projects</h3>
            <br />
            <p>
                这里是我近期在做的产品和开源贡献，都是我真正感兴趣的东西。
            </p>
            <br />
            <ResumeDownload />
            <br />
            <div className="text-block">
                <h2>Inbetween</h2>
                <br />
                <p>
                    一个两人私密写作空间。写日记、记想法、发随笔，只有你邀请的那个人能看见。没有通知，没有已读，没有社交压力。邀请一个人才能开始使用。
                </p>
                <br />
                <p>
                    适合情侣、挚友，或任何两个想安静共处的人。我想做一个反社交媒体的产品——不是让你展示自己，而是让你和某一个人真正在一起。
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://inbetween.okethan.top"
                        >
                            <p>
                                <b>[产品]</b> - inbetween.okethan.top
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>Foreseen</h2>
                <br />
                <p>
                    一个男人在某一天被封印到了一本书里。他不愿意透露东西，但有时候又会胡言乱语。书可能有情绪，可能会揣测你的想法，甚至直接霸占你的输入框。不要试图窥探他，他可能会提前结束话题。
                </p>
                <br />
                <p>
                    这是一个 AI 交互实验，探索 AI 角色的边界感和主动性——当 AI 不再只是回答问题，而是有自己的情绪和意志时，对话会变成什么样。
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://foreseen.okethan.top"
                        >
                            <p>
                                <b>[产品]</b> - foreseen.okethan.top
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>memU Go SDK</h2>
                <br />
                <p>
                    memU 是一个拥有 1.4w star 的开源记忆管理项目。我为它编写了官方 Go SDK，是该项目的核心贡献者之一。
                </p>
                <br />
                <p>
                    这也是我进入开源社区的第一个正式贡献，让我对大规模开源协作有了更深的理解。
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/NevaMind-AI/memU-sdk-go"
                        >
                            <p>
                                <b>[GitHub]</b> - memU Go SDK
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <ResumeDownload />
        </div>
    );
};

const styles: StyleSheetCSS = {
    caption: {
        width: '80%',
    },
};

export default SoftwareProjects;
