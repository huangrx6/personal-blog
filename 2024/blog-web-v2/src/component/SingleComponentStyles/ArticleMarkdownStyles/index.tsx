import {css, Global} from '@emotion/react';
import React from "react";
import {useStateContext} from "../../../contexts/ContextProvider";

const ArticleMarkdownStyles: React.FC = () => {

    const {
        currentColor,
        navBrushBg
    } = useStateContext();

    return (
        <>
            <Global
                styles={css`

                  :root {
                    --waline-theme-color: 'rgba(34, 34, 34)';
                    --waline-active-color: ${currentColor};
                  }

                  blockquote {
                    /* 在这里设置你想要的样式 */
                    background-color: ${currentColor};
                    color: ${'rgba(34, 34, 34)'} !important;
                    border-color: ${currentColor} !important;
                    padding: 0.5rem !important;
                  }

                  .markdown-navigation .title-anchor:hover {
                    text-decoration-line: underline;
                    text-underline-offset: 2px;
                    text-decoration-thickness: 2px;
                    text-decoration-style: solid;
                    text-decoration-color: ${currentColor} !important;
                  }

                  .markdown-navigation {
                    border-color: ${currentColor};
                  }

                  .code-wrapper .copy-btn:hover,
                  .blog-category-header:hover {
                    background-color: ${currentColor};
                  }

                  .wl-delete svg path {
                    fill: ${currentColor}
                  }

                  .wl-btn:disabled {
                    background-color: ${currentColor};
                  }

                  .wl-action:hover {
                    color: ${currentColor} !important;
                  }

                  .ant-pagination-item-active {
                    background: transparent !important;
                    border-color: ${currentColor} !important;
                  }

                  .ant-modal-content, .ant-modal-title {
                    background-color: ${currentColor} !important;
                  }

                  .hover-brush-bg:hover {
                    background-image: ${navBrushBg};
                  }

                  .draggable {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 2;
                  }

                  .draggable-body {
                    --width: 391px;
                    --height: 232px;
                    position: absolute;
                    width: var(--width);
                    height: var(--height);
                    top: calc(-1 * var(--height) / 2);
                    left: calc(-1 * var(--width) / 2);
                    opacity: 0;
                    transform: translate3d(0px, 0px, 0px);
                    transform-origin: left top;
                    pointer-events: none;
                    transition: opacity 300ms ease-in-out 0s;
                  }

                  .draggable-body::before {
                    content: "";
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 365px;
                    height: 157px;
                    transform: translate(-50%, -50%) rotate(-12.5deg);
                    background: rgba(96, 102, 255, 0.15);
                    filter: blur(80px);
                  }

                  .draggable-body::after {
                    content: "";
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 230px;
                    height: 100px;
                    background: ${currentColor};
                    transform: translate(-50%, -50%) rotate(-12.5deg);
                    filter: blur(70px);
                  }

                  .site-home-participate::before {
                    background: ${currentColor};
                    transform: rotate(1deg) translateX(14px);
                  }

                  .site-home-participate::before, .site-home-participate::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    transition: .3s;
                  }

                  .site-home-participate:hover:before, .site-home-participate:hover:after {
                    transform: rotate(0deg) translateX(0px);
                  }

                `}
            />
        </>
    );
};

export default ArticleMarkdownStyles;