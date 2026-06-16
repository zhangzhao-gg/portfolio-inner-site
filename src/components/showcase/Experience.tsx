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
                    一个很小的团队，每个人都很独立。ceo非常独特，思维跳脱，执行力极强，产品理念品味都很有意思。我因为喜欢他和他的产品所以来到这家公司。
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
                    但让我印象更深的是人。CEO 魏佳星活跃、朴实、专注、快速——他让我第一次真实感受到一个出色的人是什么样的。同事们也很好，整个氛围让我感受到了社会给我的第一份温暖。工程师气质的科技公司很吸引人。
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
                    我热爱思考性格与命运的关系，于是决定成为一名心理咨询师。我师从超个人心理学博士肖青，既是她的弟子，也是她的助理，跟随她系统学习了一年心理咨询。
                </p>
                <br />
                <p>
                    我做个案，带心理成长团体，冥想，茶叙，OH 卡，小物件排列。
                </p>
                <br />
                <p>
                    有来访者感激我陪她走过一段艰难的时光，也有来访者说，这是她第一次看清楚自己命运的细线。
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
                <br />
                <p>
                    在校期间拿了不少全国级学科竞赛奖。我很喜欢打比赛，喜欢那种挑战和锻炼的感觉。大概就是从那时候开始，我在思考我想成为什么样的人。
                </p>
                <br />
                <p>
                    2023 年作为技术负责人做了一款 Web3 产品，用户量达到 1.6w+。过程中逐渐意识到 Web3 的理念很好，但要真正落地，与现实之间还有很大的鸿沟。
                </p>
                <br />
                <p>
                    2024 年初做了一款校园论坛产品，和学校周边的线下门店合作。项目最终失败了——我意识到光有技术，没有传播能力与销售能力，无法让一个产品成功推广出去。
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
