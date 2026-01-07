import React, {useEffect} from 'react';
import {init} from '@waline/client/dist/waline.mjs';
import "@waline/client/dist/waline.css"
// import "./style.css"

const ArticleComment: React.FC = () => {

    useEffect(() => {
        const locale = {
            link: '主页',
            placeholder: '也不知过了多久，才找到了你的踪迹...',
            meta: ['nick', 'mail', 'link', 'tag'],
        };

        init({
            el: '#waline',
            serverURL: 'https://waline.huangrx.cn',
            locale: locale,
            login: 'force',
            pageview: true
        });
    }, [])

    return (
        <div id="waline" className="!bg-light-mode-one dark:!bg-dark-mode">

        </div>
    );
};

export default ArticleComment;
