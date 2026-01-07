import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ArticleSyntaxHighlighter from "./ArticleSyntaxHighlighter";
import ArticleToc from "../ArticleToc";
import {useStateContext} from "../../contexts/ContextProvider";
import ArticleComment from "../ArticleComment";
import LoadingAnimation from "../Animations/LoadingAnimation";

interface ArticleMarkdownProps {
    markdownWidth: string;
    tocWidth: string;
    enableToc: boolean;
    enableComment: boolean;
    cover: string;
    documentUrl: string;
}

const ArticleMarkdown: React.FC<ArticleMarkdownProps> = ({
                                                             markdownWidth,
                                                             tocWidth,
                                                             enableToc,
                                                             enableComment,
                                                             cover,
                                                             documentUrl
                                                         }) => {

    const {
        currentMode,
        setCurrentMode,
        setReadingTime,
        currentColor
    } = useStateContext();

    useEffect(() => {
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeMode) {
            setCurrentMode(currentThemeMode);
        }

    }, [currentMode, setCurrentMode]);

    // 文章内容
    const [markdown, setMarkdown] = useState('');

    // 预处理后的文章目录内容
    const [tocMarkdown, setTocMarkdown] = useState('');

    const [articleWordCount, setArticleWordCount] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // 读取 Markdown 文件内容
        if (documentUrl) {
            setLoading(true);
            fetch(documentUrl)
                .then(response => response.text())
                .then(text => {
                    setMarkdown(text)

                    // 预处理markdown内容，将代码块全部删除，以防止代码块中的#误使markdown-navbar生成标题。
                    const processedText = text.replace(/```[\s\S]*?```/g, '');
                    setTocMarkdown(processedText);

                    setArticleWordCount(text.replace(/[\W_]/g, '').length);
                })
                .catch(error => console.log(error));
            setLoading(false)
        }
    }, [documentUrl]);

    useEffect(() => {
        // 使用正则表达式去除文章中的空格、标点符号等非字母字符,统计文章字数
        setReadingTime(Math.ceil(articleWordCount / 250))
    }, [articleWordCount, setReadingTime]);


    return (
        <>
            {
                loading ?
                    <LoadingAnimation/>
                    :
                    <div className={`relative flex w-full justify-center`}>
                        <div className={`text-dark dark:text-light bg-light dark:bg-dark-mode ${markdownWidth}`}>
                            <ReactMarkdown
                                className="markdown-body !font-pf !text-dark dark:!text-light !bg-light-mode-one dark:!bg-dark-mode pb-10 !text-[14px] !leading-1.6r md:!leading-1.4r"
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                children={markdown}
                                components={{
                                    code({node, inline, className, children, ...props}) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return inline ?
                                            (
                                                <span
                                                    className="text-dark dark:text-light p-2p rounded-2p mx-2p"
                                                    style={{backgroundColor: currentColor}}
                                                >
                                                            <code
                                                                className={`${className} !bg-transparent !rounded-none `} {...props}>
                                                                {children}
                                                            </code>
                                                        </span>
                                            )
                                            :
                                            (
                                                match ?
                                                    (
                                                        <ArticleSyntaxHighlighter children={children}
                                                                                  language={match[1]}
                                                                                  {...props}
                                                        />
                                                    )
                                                    :
                                                    (
                                                        <ArticleSyntaxHighlighter children={children}
                                                                                  language="bash"
                                                                                  {...props}
                                                        />
                                                    )
                                            )
                                    },
                                }}
                            />

                            {enableComment ? <ArticleComment/> : ''}
                        </div>

                        {enableToc && tocMarkdown ?
                            <ArticleToc tocMarkdown={tocMarkdown} width={tocWidth} cover={cover}/> : ''}
                    </div>
            }
        </>
    );
};

export default ArticleMarkdown;