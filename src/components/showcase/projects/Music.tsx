import React from 'react';

export interface MusicProjectsProps {}

const MusicProjects: React.FC<MusicProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Music</h1>
            <h3>Projects</h3>
            <br />
            <div className="text-block">
                <p>这里暂时还没有内容，敬请期待。</p>
            </div>
        </div>
    );
};

export default MusicProjects;
