import React from 'react';
import ArticleChip from "../ArticleChip";
import LazyImage from "../LazyImage";
import {DocumentResponseRecord} from "../../api/path/document";
import {Link} from "react-router-dom";
import {IoEyeOutline} from "react-icons/io5";
import {useStateContext} from "../../contexts/ContextProvider";
import {api} from "../../api";

interface BlogArticleItemProps {
    record: DocumentResponseRecord;
}

const BlogArticleItem: React.FC<BlogArticleItemProps> = ({record}) => {

    const {currentColor} = useStateContext();

    const handlerAddView = (id: number) => {
        api.addView(id).then((res) => {

        })
    }

    return (
        <article className="ease my-8  grid h-auto  w-full grid-cols-12 overflow-hidden rounded-lg  bg-light p-6 shadow-md transition-all duration-300 hover:shadow-none dark:bg-dark  sxl:p-0">
            <Link className="relative col-span-5 flex aspect-video h-auto w-full items-center justify-center self-center overflow-hidden sxl:col-span-12 sxl:rounded-b-none"
                  to={`/blogs/article/${record.id}` } onClick={() => handlerAddView(record.id)}>
                <div className="object-cover ease h-full w-full  transition-all duration-300 hover:scale-105">
                    <LazyImage url={record.cover}/>
                </div>
            </Link>
            <div className="col-span-7 sxl:col-span-12 flex flex-col justify-center px-10 py-8 sxl:p-6">
                <div className="mb-06r md:mb-0.5">
                    <ArticleChip label={record.subcategory}/>
                </div>
                <Link to={`/blogs/article/${record.id}`} onClick={() => handlerAddView(record.id)}>
                    <h2
                        className="mt-2 cursor-pointer text-left font-bold decoration-solid  decoration-2 underline-offset-2 hover:underline dark:text-light text-lg 2xl:text-1r text-ellipsis line-clamp-1"
                        style={{textDecorationColor: currentColor}}
                    >
                        {record.title}
                    </h2>
                </Link>
                <p className="mt-2 w-full text-left text-sm font-normal leading-normal text-dark dark:text-light xslg:text-xs md:text-sm text-ellipsis line-clamp-1">{record.description}</p>
                <div className="flex justify-between items-center text-06r">
                    <div className="mt-4 flex items-center dark:text-light">
                        <span className="mr-2">By</span>
                        <a href="https://www.huangrx.cn" rel="noreferrer nofollow" target="_blank"
                           className="flex items-center undefined">
                            <img src={record.author_avatar} alt="img"
                                 className="mr-1 h-[1.5rem] w-[1.5rem] rounded-full"/>
                            <span className="font-bold dark:font-semibold">{record.author}</span>
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

export default BlogArticleItem;