import React from 'react';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {tomorrow} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {nord} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {notification} from "antd";
import {HiOutlineCheck} from "react-icons/hi";
import {useStateContext} from "../../contexts/ContextProvider";

interface ArticleSyntaxHighlighterProps {
    children: React.ReactNode | React.ReactNode[];
    language: string;

    [key: string]: any;
}

const ArticleSyntaxHighlighter: React.FC<ArticleSyntaxHighlighterProps> = ({children, language, ...props}) => {

    const {currentMode} = useStateContext();

    // 代码块复制通知
    const [notificationApi, contextHolderNotification] = notification.useNotification();

    const handleCopy = () => {
        notificationApi.open({
            message: '已复制！',
            description:
                '代码复制到剪贴板!',
            icon: <HiOutlineCheck/>,
            duration: 2,
        });
    };

    return (
        <>
            {contextHolderNotification}
            <CopyToClipboard text={String(children).replace(/\n$/, '')}>
                <div className="code-wrapper relative text-08r">
                    <SyntaxHighlighter
                        language={language}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        {...props}
                        style={currentMode === "Dark" ? tomorrow : nord}
                        className='code !m-0 !leading-2rem !p-1r'
                    />
                    <div
                        className={`copy-btn hidden absolute px-4p py-2p bg-light text-dark dark:hover:text-light cursor-pointer select-none transition-all duration-300 ease top-[8px] right-[10px] rounded-2p text-06r`}
                        style={{}}
                        onClick={handleCopy}>
                        复制
                    </div>
                </div>
            </CopyToClipboard>
        </>

    );
};

export default ArticleSyntaxHighlighter;