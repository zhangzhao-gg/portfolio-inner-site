import React from 'react';

export interface ArtProjectsProps {}

const ArtProjects: React.FC<ArtProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Art</h1>
            <h3>Projects</h3>
            <br />
            <div className="text-block">
                <p>敬请期待。</p>
            </div>
        </div>
    );
};

export default ArtProjects;
