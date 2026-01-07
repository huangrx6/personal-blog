import {Global, css} from '@emotion/react';
import React, {useEffect, useState} from "react";
import {useStateContext} from "../../../contexts/ContextProvider";

const GlobalStyles: React.FC = () => {
    const whiteColor = "#F8F9FAFF";
    const blackColor = "#121212FF";
    const grayColor = "#7E838DFF";

    const [currentColor, setCurrentColor] = useState<string>("");
    const [currentColorReverse, setCurrentColorReverse] = useState<string>("");

    const {
        currentMode,
        setCurrentMode,
    } = useStateContext();

    useEffect(() => {
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeMode) {
            setCurrentMode(currentThemeMode);

            currentThemeMode === "Dark" ? setCurrentColor(whiteColor) : setCurrentColor(blackColor);
            currentThemeMode === "Dark" ? setCurrentColorReverse(blackColor) : setCurrentColorReverse(whiteColor);
        } else {
            currentMode === "Dark" ? setCurrentColor(whiteColor) : setCurrentColor(blackColor);
            currentMode === "Dark" ? setCurrentColorReverse(blackColor) : setCurrentColorReverse(whiteColor);
        }

    }, [currentMode, setCurrentMode]);

    return (
        <>
            <Global
                styles={css`

                  .markdown-body ul, .markdown-body ol {
                    list-style: initial !important;
                  }

                  .markdown-body table tr {
                    background-color: inherit !important;
                    border-top: 1px solid ${grayColor};
                  }

                  .markdown-body table tr:nth-of-type(2n) {
                    background-color: inherit !important;
                    border-top: 1px solid ${grayColor};
                  }

                  .markdown-body table th,
                  .markdown-body table td {
                    padding: 10px 12px;
                    border: 1px solid ${grayColor};
                  }

                  .markdown-body .highlight pre,
                  .markdown-body pre {
                    padding: 0 !important;
                    overflow: auto;
                    border-radius: 0 !important;
                  }

                  .markdown-body .code-wrapper:hover .copy-btn {
                    display: block;
                  }

                  .markdown-navigation .title-anchor {
                    display: block;
                    color: ${currentColor};
                    transition: all 0.2s;
                    margin: 0.8em 0;
                    font-weight: lighter;
                    line-height: 2em;
                    padding-right: 1.8em;
                    cursor: pointer;

                    white-space: nowrap; /* 不换行 */
                    overflow: hidden; /* 超出部分隐藏 */
                    text-overflow: ellipsis; /* 使用省略号表示多余部分 */
                  }

                  .markdown-navigation .title-anchor small {
                    margin: 0 0.8em;
                  }

                  .markdown-navigation .title-level1 {
                    color: ${currentColor};
                    font-size: 1.2rem;
                    padding-left: 1em;
                    font-weight: normal;
                  }

                  .markdown-navigation .title-level2 {
                    color: ${currentColor};
                    font-size: 1.1rem;
                    padding-left: 1.5em;
                    font-weight: normal;
                  }

                  .markdown-navigation .title-level3 {
                    color: ${currentColor};
                    font-size: 1rem;
                    padding-left: 3em;
                    font-weight: normal;
                  }

                  .markdown-navigation .title-level4 {
                    color: ${grayColor};
                    font-size: 0.9rem;
                    padding-left: 5em;
                  }

                  .markdown-navigation .title-level5 {
                    color: ${grayColor};
                    font-size: 0.9rem;
                    padding-left: 6.5em;
                  }

                  .markdown-navigation .title-level6 {
                    color: ${grayColor};
                    font-size: 0.9rem;
                    padding-left: 8em;
                  }

                  .lazy-load-image-background.blur {
                    filter: blur(15px) !important;
                    width: 100%;
                    height: 100%;
                  }

                  .lazy-load-image-background.blur.lazy-load-image-loaded {
                    filter: blur(0) !important;
                    transition: filter .3s !important;
                    width: 100%;
                    height: 100%;
                  }

                  .lazy-load-image-background.blur > img {
                    opacity: 0 !important;
                  }

                  .lazy-load-image-background.blur.lazy-load-image-loaded > img {
                    opacity: 1 !important;
                    transition: opacity .3s !important;
                  }

                  @keyframes navbarOpenMenuAnimation {
                    0% {
                      transform: rotate(45deg);
                    }
                    100% {
                      transform: rotate(0deg);
                    }
                  }

                  @keyframes navbarCloseMenuAnimation {


                    0% {
                      transform: rotate(45deg);
                    }
                    100% {
                      transform: rotate(0deg);
                    }
                  }

                  .navbar-close-menu {
                    animation: navbarCloseMenuAnimation 0.3s ease forwards;
                  }

                  .navbar-open-menu {
                    animation: navbarOpenMenuAnimation 0.3s ease forwards;
                  }

                  #waline {
                    width: 100% !important;
                    margin: 0 auto !important;
                    background-color: ${currentColorReverse};
                    padding-bottom: 1.5rem;
                  }

                  .wl-panel {
                    border: none !important;
                    border-radius: 0.5em !important;
                    margin: 0 !important;
                  }

                  .wl-comment {
                    border: none !important;
                    box-shadow: none !important;
                    flex-direction: column !important;
                  }

                  .wl-editor {
                    min-height: 15rem !important;
                    width: calc(100% - 3rem) !important;
                  }

                  .wl-editor:focus, .wl-input:focus, .wl-card .wl-meta > span {
                    background: none !important;
                  }

                  .wl-footer, .wl-editor {
                    margin: 1.5rem !important;
                  }

                  .wl-editor,
                  .wl-input,
                  .wl-action,
                  .wl-card .wl-delete,
                  .wl-card .wl-like,
                  .wl-card .wl-reply,
                  .wl-card .wl-edit,
                  .wl-btn,
                  [data-waline] p,
                  .wl-count {
                    color: ${currentColor} !important;
                  }

                  .wl-card {
                    border-bottom: none !important;
                  }

                  .wl-user, .wl-meta, .wl-power, .wl-like, .wl-login-info {
                    display: none !important;
                  }

                  .wl-card-item {
                    margin-bottom: 1.5rem !important;
                    padding: 1.5rem !important;
                  }

                  .wl-panel, .wl-card-item {
                    border: 1px solid rgb(156, 163, 175, 0.4) !important;
                    box-shadow: none !important;
                    border-radius: 10px !important;
                  }

                  .wl-card-item, .wl-tab-wrapper, .wl-comment, .wl-panel {
                    background: ${currentColorReverse} !important;
                  }

                  .wl-card-item .wl-card-item {
                    padding-inline-end: 1.5rem !important;
                  }

                  .wl-card .wl-quote {
                    border-inline-start: none !important;
                  }

                  .wl-btn.primary:disabled {
                    background-color: ${currentColorReverse}
                  }

                  .ant-btn-primary {
                    background-color: ${blackColor} !important;
                  }

                  .ant-pagination, .ant-pagination-item a, .ant-pagination-item-link, .ant-pagination-item-ellipsis {
                    color: ${currentColor} !important;
                  }

                  .ant-modal-content, .ant-modal-title {
                    color: ${currentColor} !important;
                  }
                  
                  .ant-divider-horizontal.ant-divider-with-text::before, .ant-divider-horizontal.ant-divider-with-text::after {
                    border-block-start-color: ${currentColor} !important;
                  }

                  .category-header::-webkit-scrollbar {
                    height: 5px;
                  }

                  .category-header::-webkit-scrollbar-thumb {
                    background-color: ${currentColor};
                    border-radius: 3px;
                  }

                  .site-home-participate::after {
                    border: 1px solid ${currentColor};
                    transform: rotate(-1deg) translateX(-14px);
                  }

                  .tracking-in-contract-bck {
                    -webkit-animation: tracking-in-contract-bck 2s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
                    animation: tracking-in-contract-bck 2s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
                  }

                  @-webkit-keyframes tracking-in-contract-bck {
                    0% {
                      letter-spacing: 1em;
                      -webkit-transform: translateZ(400px);
                      transform: translateZ(400px);
                      opacity: 0;
                    }
                    40% {
                      opacity: 0.6;
                    }
                    100% {
                      -webkit-transform: translateZ(0);
                      transform: translateZ(0);
                      opacity: 1;
                    }
                  }
                  @keyframes tracking-in-contract-bck {
                    0% {
                      letter-spacing: 1em;
                      -webkit-transform: translateZ(400px);
                      transform: translateZ(400px);
                      opacity: 0;
                    }
                    40% {
                      opacity: 0.6;
                    }
                    100% {
                      -webkit-transform: translateZ(0);
                      transform: translateZ(0);
                      opacity: 1;
                    }
                  }

                  .slide-in-bottom {
                    -webkit-animation: slide-in-bottom 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                    animation: slide-in-bottom 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                  }

                  @-webkit-keyframes slide-in-bottom {
                    0% {
                      -webkit-transform: translateY(1000px);
                      transform: translateY(1000px);
                      opacity: 0;
                    }
                    100% {
                      -webkit-transform: translateY(0);
                      transform: translateY(0);
                      opacity: 1;
                    }
                  }
                  @keyframes slide-in-bottom {
                    0% {
                      -webkit-transform: translateY(1000px);
                      transform: translateY(1000px);
                      opacity: 0;
                    }
                    100% {
                      -webkit-transform: translateY(0);
                      transform: translateY(0);
                      opacity: 1;
                    }
                  }

                  .roll-in-left {
                    -webkit-animation: roll-in-left 2s ease-out both;
                    animation: roll-in-left 2s ease-out both;
                  }

                  @-webkit-keyframes roll-in-left {
                    0% {
                      -webkit-transform: translateX(-800px) rotate(-540deg);
                      transform: translateX(-800px) rotate(-540deg);
                      opacity: 0;
                    }
                    100% {
                      -webkit-transform: translateX(0) rotate(0deg);
                      transform: translateX(0) rotate(0deg);
                      opacity: 1;
                    }
                  }
                  @keyframes roll-in-left {
                    0% {
                      -webkit-transform: translateX(-800px) rotate(-540deg);
                      transform: translateX(-800px) rotate(-540deg);
                      opacity: 0;
                    }
                    100% {
                      -webkit-transform: translateX(0) rotate(0deg);
                      transform: translateX(0) rotate(0deg);
                      opacity: 1;
                    }
                  }

                  .bounce-top {
                    -webkit-animation: bounce-top 2s both;
                    animation: bounce-top 2s both;
                  }

                  @-webkit-keyframes bounce-top {
                    0% {
                      -webkit-transform: translateY(-45px);
                      transform: translateY(-45px);
                      -webkit-animation-timing-function: ease-in;
                      animation-timing-function: ease-in;
                      opacity: 1;
                    }
                    24% {
                      opacity: 1;
                    }
                    40% {
                      -webkit-transform: translateY(-24px);
                      transform: translateY(-24px);
                      -webkit-animation-timing-function: ease-in;
                      animation-timing-function: ease-in;
                    }
                    65% {
                      -webkit-transform: translateY(-12px);
                      transform: translateY(-12px);
                      -webkit-animation-timing-function: ease-in;
                      animation-timing-function: ease-in;
                    }
                    82% {
                      -webkit-transform: translateY(-6px);
                      transform: translateY(-6px);
                      -webkit-animation-timing-function: ease-in;
                      animation-timing-function: ease-in;
                    }
                    93% {
                      -webkit-transform: translateY(-4px);
                      transform: translateY(-4px);
                      -webkit-animation-timing-function: ease-in;
                      animation-timing-function: ease-in;
                    }
                    25%,
                    55%,
                    75%,
                    87% {
                      -webkit-transform: translateY(0px);
                      transform: translateY(0px);
                      -webkit-animation-timing-function: ease-out;
                      animation-timing-function: ease-out;
                    }
                    100% {
                      -webkit-transform: translateY(0px);
                      transform: translateY(0px);
                      -webkit-animation-timing-function: ease-out;
                      animation-timing-function: ease-out;
                      opacity: 1;
                    }
                  }
                  @keyframes bounce-top {
                    0% {
                      -webkit-transform: translateY(-45px);
                      transform: translateY(-45px);
                      -webkit-animation-timing-function: ease-in;
                      animation-timing-function: ease-in;
                      opacity: 1;
                    }
                    24% {
                      opacity: 1;
                    }
                    40% {
                      -webkit-transform: translateY(-24px);
                      transform: translateY(-24px);
                      -webkit-animation-timing-function: ease-in;
                      animation-timing-function: ease-in;
                    }
                    65% {
                      -webkit-transform: translateY(-12px);
                      transform: translateY(-12px);
                      -webkit-animation-timing-function: ease-in;
                      animation-timing-function: ease-in;
                    }
                    82% {
                      -webkit-transform: translateY(-6px);
                      transform: translateY(-6px);
                      -webkit-animation-timing-function: ease-in;
                      animation-timing-function: ease-in;
                    }
                    93% {
                      -webkit-transform: translateY(-4px);
                      transform: translateY(-4px);
                      -webkit-animation-timing-function: ease-in;
                      animation-timing-function: ease-in;
                    }
                    25%,
                    55%,
                    75%,
                    87% {
                      -webkit-transform: translateY(0px);
                      transform: translateY(0px);
                      -webkit-animation-timing-function: ease-out;
                      animation-timing-function: ease-out;
                    }
                    100% {
                      -webkit-transform: translateY(0px);
                      transform: translateY(0px);
                      -webkit-animation-timing-function: ease-out;
                      animation-timing-function: ease-out;
                      opacity: 1;
                    }
                  }

                  .rotate-center {
                    -webkit-animation: rotate-center 3s ease-in-out both infinite;
                    animation: rotate-center 3s ease-in-out both infinite;
                  }

                  @-webkit-keyframes rotate-center {
                    0% {
                      -webkit-transform: rotate(0);
                      transform: rotate(0);
                    }
                    100% {
                      -webkit-transform: rotate(360deg);
                      transform: rotate(360deg);
                    }
                  }
                  @keyframes rotate-center {
                    0% {
                      -webkit-transform: rotate(0);
                      transform: rotate(0);
                    }
                    100% {
                      -webkit-transform: rotate(360deg);
                      transform: rotate(360deg);
                    }
                  }

                  .scale-in-center {
                    -webkit-animation: scale-in-center 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                    animation: scale-in-center 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                  }

                  @-webkit-keyframes scale-in-center {
                    0% {
                      -webkit-transform: scale(0);
                      transform: scale(0);
                      opacity: 1;
                    }
                    100% {
                      -webkit-transform: scale(1);
                      transform: scale(1);
                      opacity: 1;
                    }
                  }
                  @keyframes scale-in-center {
                    0% {
                      -webkit-transform: scale(0);
                      transform: scale(0);
                      opacity: 1;
                    }
                    100% {
                      -webkit-transform: scale(1);
                      transform: scale(1);
                      opacity: 1;
                    }
                  }

                  .wave-forever {
                    -webkit-animation: wave-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
                    animation: wave-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
                  }

                  @keyframes wave-forever {
                    0% {
                      transform: translate3d(-90px, 0, 0);
                    }
                    100% {
                      transform: translate3d(85px, 0, 0);
                    }
                  }

                  .scale-up-hor-right {
                    -webkit-animation: scale-up-hor-right 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                    animation: scale-up-hor-right 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                  }

                  @-webkit-keyframes scale-up-hor-right {
                    0% {
                      -webkit-transform: scaleX(0.4);
                      transform: scaleX(0.4);
                      -webkit-transform-origin: 100% 100%;
                      transform-origin: 100% 100%;
                    }
                    100% {
                      -webkit-transform: scaleX(1);
                      transform: scaleX(1);
                      -webkit-transform-origin: 100% 100%;
                      transform-origin: 100% 100%;
                    }
                  }
                  @keyframes scale-up-hor-right {
                    0% {
                      -webkit-transform: scaleX(0.4);
                      transform: scaleX(0.4);
                      -webkit-transform-origin: 100% 100%;
                      transform-origin: 100% 100%;
                    }
                    100% {
                      -webkit-transform: scaleX(1);
                      transform: scaleX(1);
                      -webkit-transform-origin: 100% 100%;
                      transform-origin: 100% 100%;
                    }
                  }

                  .scale-up-hor-left {
                    -webkit-animation: scale-up-hor-left 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                    animation: scale-up-hor-left 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                  }

                  @-webkit-keyframes scale-up-hor-left {
                    0% {
                      -webkit-transform: scaleX(0.4);
                      transform: scaleX(0.4);
                      -webkit-transform-origin: 0% 0%;
                      transform-origin: 0% 0%;
                    }
                    100% {
                      -webkit-transform: scaleX(1);
                      transform: scaleX(1);
                      -webkit-transform-origin: 0% 0%;
                      transform-origin: 0% 0%;
                    }
                  }
                  @keyframes scale-up-hor-left {
                    0% {
                      -webkit-transform: scaleX(0.4);
                      transform: scaleX(0.4);
                      -webkit-transform-origin: 0% 0%;
                      transform-origin: 0% 0%;
                    }
                    100% {
                      -webkit-transform: scaleX(1);
                      transform: scaleX(1);
                      -webkit-transform-origin: 0% 0%;
                      transform-origin: 0% 0%;
                    }
                  }


                `}
            />
        </>
    );
};

export default GlobalStyles;