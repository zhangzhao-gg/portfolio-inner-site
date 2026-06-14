import React from 'react';
import ResumeDownload from './ResumeDownload';

export interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className="site-page-content">
            <ResumeDownload />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>某 AI 陪伴公司</h1>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>AI 工程师实习</h3>
                        <b><p>2026.01 - 至今</p></b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    一个很小的团队，每个人都很独立。创始人是连续创业者，思维跳脱，执行力极强，特别善于从用户角度出发想问题，这让我重新理解了什么叫做"做产品"。我因为喜欢他和他的产品所以来到这家公司。
                </p>
                <br />
                <p>
                    公司在探索能承载人与人情感连接的 AI 产品。我负责大模型记忆层架构设计与上下文工程体系搭建，同时独立推进自有产品。工程和产品的边界在这里很模糊——我喜欢这种模糊。
                </p>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>云蝠智能</h1>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>算法工程师实习</h3>
                        <b><p>2025.08 - 2026.01</p></b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    参与超大规模 VoiceAgent 系统构建。负责 VAD 模块开发与实时通讯链路的延迟优化。
                </p>
                <br />
                <p>
                    但让我印象更深的是人。CEO 魏佳星活跃、朴实、专注、快速——他让我第一次真实感受到一个出色的人是什么样的。同事们也很好，整个氛围让我感受到了社会给我的第一份温暖。这段经历改变了我很多。
                </p>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>疗愈师</h1>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>独立执业</h3>
                        <b><p>2025.01 - 2026.01</p></b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    在读研期间参加了心理咨询培训，后来成为了独立执业的疗愈师。带过心理团体，做了 50 小时以上的个案。有来访者的抑郁症在这个过程中痊愈了。有人说，在这里他第一次看清楚了自己。
                </p>
                <br />
                <p>
                    我擅长精神分析，用 OH 卡和小物件排列做投射工作。但比技术更重要的是——我真的喜欢那种感觉：看着一个人从模糊变得清晰，像雾散开，像光进来。
                </p>
                <br />
                <p>
                    这段经历和我做 AI 产品的动机是同一件事的两面。
                </p>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>南京工业大学</h1>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>计算机科学与技术 · 本科 + 硕士</h3>
                        <b><p>2019 - 2026</p></b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    离开中学后的第一课。七年，感受很复杂——遇到了一些真正有趣的人，也吃过一些亏。或许这就是生活本来的样子。
                </p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
};

export default Experience;
