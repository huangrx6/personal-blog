import React from 'react';
import ArticleChip from "../ArticleChip";
import LazyImage from "../LazyImage";
import {DocumentResponseRecord} from "../../api/path/document";
import {IoEyeOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider";
import {api} from "../../api";

interface BlogArticleItemProps {
    record: DocumentResponseRecord;
}

const BlogArticleItemV2: React.FC<BlogArticleItemProps> = ({record}) => {

    const {currentColor} = useStateContext()

    const handlerAddView = (id: number) => {
        api.addView(id).then((res) => {

        })
    }

    return (
        <article
            className="ease  my-4 flex h-max w-full  flex-col items-center overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-none dark:bg-dark undefined">
            <Link className="relative col-span-5 flex aspect-video h-auto w-full items-center justify-center self-center overflow-hidden sxl:col-span-12 sxl:rounded-b-none"
               to={`/blogs/article/${record.id}` } onClick={() => handlerAddView(record.id)}>
                <div className="object-cover ease h-full w-full  transition-all duration-300 hover:scale-105">
                    <LazyImage url={record.cover}/>
                </div>
            </Link>
            <div className="w-full flex flex-col justify-center px-10 py-8 sxl:p-6">
                <div className="mb-06r md:mb-0.5">
                    <ArticleChip label={record.subcategory}/>
                </div>
                <Link to={`/blogs/article/${record.id}`} onClick={() => handlerAddView(record.id)}>
                    <h2
                        className="mt-2 cursor-pointer  font-pf font-bold decoration-solid  decoration-2 underline-offset-2 hover:underline dark:text-light text-lg 2xl:text-1r text-ellipsis line-clamp-1"
                        style={{textDecorationColor: currentColor}}
                    >
                        {record.title}
                    </h2>
                </Link>
                <p className="mt-2 w-full font-pf font-normal leading-normal text-dark dark:text-light text-08r text-ellipsis line-clamp-1">{record.description}</p>
                <div className="flex justify-between items-center text-06r">
                    <div className="mt-4 flex items-center dark:text-light">
                        <span className="mr-2">By</span>
                        <a href="https://www.huangrx.cn" rel="noreferrer nofollow" target="_blank"
                           className="flex items-center undefined">
                            <img src={record.author_avatar} alt="img"
                                 className="mr-1 h-[1.5rem] w-[1.5rem] rounded-full"/>
                            <span className="font-os font-bold dark:font-semibold">{record.author}</span>
                        </a>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <IoEyeOutline/>
                        <span>{record.views}&nbsp;views</span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogArticleItemV2;