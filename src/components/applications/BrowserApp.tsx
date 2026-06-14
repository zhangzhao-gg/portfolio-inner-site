/**
 * [INPUT]: 依赖 os/Window 的窗口容器
 * [OUTPUT]: 对外提供 BrowserApp 组件，接受 url 和 title 参数，直接展示网站
 * [POS]: applications/ 的通用浏览器窗口，被 InbetweenApp / ForeseenApp 复用
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import React, { useState } from 'react';
import Window from '../os/Window';

export interface BrowserAppProps extends WindowAppProps {
    url: string;
    title: string;
}

const BrowserApp: React.FC<BrowserAppProps> = (props) => {
    const [width, setWidth] = useState(1020);
    const [height, setHeight] = useState(680);

    return (
        <Window
            top={20}
            left={60}
            width={width}
            height={height}
            windowTitle={props.title}
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
            bottomLeftText={props.url}
        >
            <iframe
                src={props.url}
                style={styles.iframe}
                title={props.title}
                allow="fullscreen"
            />
        </Window>
    );
};

const styles: StyleSheetCSS = {
    iframe: {
        width: '100%',
        flex: 1,
        border: 'none',
        display: 'block',
    },
};

export default BrowserApp;
