import React, {useEffect, useState} from 'react';
import ArticleMarkdown from "../../../component/ArticleMarkdown";
import {IoEyeOutline} from "react-icons/io5";
import ArticleChip from "../../../component/ArticleChip";
import {useStateContext} from "../../../contexts/ContextProvider";
import {SubcategoryVO} from "../../../api/path/subcategory";
import {api} from "../../../api";
import {Link, useParams} from "react-router-dom";
import {DocumentResponseRecord} from "../../../api/path/document";

const BlogArticle = () => {

    const {id} = useParams();

    const blogArticleProps = {
        author: '',
        author_avatar: '',
        category: '',
        cover: '',
        create_time: '',
        description: '',
        document_url: '',
        id: 0,
        online: 0,
        subcategory: '',
        title: '',
        update_time: '',
        views: 0
    }

    const [blogRecord, setBlogRecord] = useState<DocumentResponseRecord>(blogArticleProps);

    useEffect(() => {
        if (id) {
            api.acquireDocumentById(parseInt(id)).then((res) => {
                setBlogRecord(res[0].data);
            })

            // 滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [id]);


    const {
        readingTime,
    } = useStateContext();

    const [subcategoryId, setSubcategoryId] = useState<number>(0);

    useEffect(() => {
        api.acquireAllSubcategory().then((res) => {

            if (res[0]?.code === 0 || res[0]?.code === 200) {
                const records = res[0].data as SubcategoryVO[];

                records.map((record) => (
                    record.subcategory_name === blogRecord.subcategory ? setSubcategoryId(record.subcategory_id) : ''
                ))

                // 滚动到顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

        });
    }, [blogRecord])

    return (
        <div
            className="py-8r md:py-6r px-16 md:px-12 sm:px-4 flex flex-col items-center justify-center text-1rem bg-light-mode-one dark:bg-dark-mode">
            <span>上传日期 {blogRecord.create_time}</span>
            <h1 className="my-2r md:my-1r text-center text-2r md:text-1r font-extrabold uppercase">
                {blogRecord.title}
            </h1>
            <div className="flex items-center justify-center sm:flex-wrap gap-10 md:gap-5">
                <div>
                    {readingTime}&nbsp;min&nbsp;read
                </div>
                <div className="flex items-center justify-center gap-2">
                    <IoEyeOutline/>
                    <span>{blogRecord.views + 1}&nbsp;views</span>
                </div>

            </div>
            <div className="mt-6 mb-12 flex items-center gap-8 md:gap-2">
                <ArticleChip label={blogRecord.category}/>
                <Link to={`/blogs/category/${subcategoryId}`}>
                    <ArticleChip label={blogRecord.subcategory}/>
                </Link>
            </div>


            {/*阅读量: <span className="waline-pageview-count" data-path="/" />*/}
            <ArticleMarkdown
                markdownWidth={"w-7/10 2xl:w-3/5 lg:w-full"}
                tocWidth={"w-1/5 2xl:w-3/10 lg:hidden"}
                enableToc={true} enableComment={true}
                documentUrl={blogRecord.document_url}
                cover={blogRecord.cover}
            />
        </div>
    );
};

export default BlogArticle;