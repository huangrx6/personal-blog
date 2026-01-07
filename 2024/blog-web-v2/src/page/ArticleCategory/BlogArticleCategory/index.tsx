import React, {useEffect, useState} from 'react';
import {DocumentRequestVO, DocumentResponsePageData} from "../../../api/path/document";
import {api} from "../../../api";
import {SubcategoryVO} from "../../../api/path/subcategory";
import {Link, useLocation} from "react-router-dom";
import {BlogArticleItemV2} from "../../../component/ArticleItem";
import {Pagination} from "antd";
import LoadingAnimation from "../../../component/Animations/LoadingAnimation";

const BlogArticleCategory = () => {

    const [allSubcategory, setAllSubcategory] = useState<SubcategoryVO[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        api.acquireAllSubcategory().then((res) => {
            if (res[0]?.code === 0 || res[0]?.code === 200) {
                setAllSubcategory(res[0]?.data)
            }
        });

        // 滚动到顶部
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);


    const [allDocument, setAllDocument] = useState<DocumentResponsePageData>();
    const [state, setState] = useState({
        pageNum: 1,
        pageSize: 9
    })
    const location = useLocation();
    const match = location.pathname?.match(/\/blogs\/category\/(\d+)/);
    const id = match && match[1];
    const [currentCategory, setCurrentCategory] = useState<number>(id ? parseInt(id) : 0);
    const [currentCategoryName, setCurrentCategoryName] = useState<string>('All');

    useEffect(() => {
        setLoading(true);

        const documentPageVO: DocumentRequestVO = {
            page_num: state.pageNum,
            page_size: state.pageSize,
            category_id: currentCategory
        }

        api.acquireDocument(documentPageVO).then((res) => {
            if (res[0]?.code === 0 || res[0]?.code === 200) {
                setAllDocument(res[0]?.data)
            }
            setLoading(false);
        });
    }, [currentCategory, state.pageNum, state.pageSize]);

    const switchCategory = (category_id: number, category_name: string) => {
        setCurrentCategory(category_id);
        setCurrentCategoryName(category_name);
    }

    function handlePageChange(currentPage: number, pageSize: number) {
        // 将页码发送给后端
        setState(() => ({
            pageNum: currentPage,
            pageSize: pageSize,
        }))

        // 滚动到顶部
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <>
            <div
                className="relative flex flex-col items-center justify-start pt-10r pb-0 md:pt-6r px-16 lg:px-14 md:px-12 sm:px-4">

                <h1 className="relative flex mb-8 block w-full font-lilita text-2r 2xl:text-1.4r md:text-1r font-semibold capitalize leading-tight tracking-wide text-dark dark:text-light">
                    <span className="ml-6">{currentCategoryName}</span>
                    <span
                        className={`absolute left-0 top-0 w-8p md:w-4p h-full rounded-md bg-dark dark:bg-light h-2p transform ease-in duration-300`}>&nbsp;</span>
                </h1>
                <header
                    className="flex w-full flex-row items-center justify-start overflow-x-auto py-06r category-header">
                    <Link
                        className={`blog-category-header p-2 px-3 mr-6 lg:mr-4 md:mb-2 md:mr-2 border-solid border-dark dark:border-light border-2p rounded font-medium last:mr-0
                                bg-transparent dark:text-light hover:cursor-pointer ${currentCategory === 0 ? "!bg-dark !text-light dark:!bg-light dark:!text-dark" : ""}`}
                        onClick={() => {
                            switchCategory(0, 'All');
                        }}
                        to="/blogs/category/all"
                        key="0"
                    >
                        <h2 className="whitespace-nowrap">All</h2>
                    </Link>
                    {
                        allSubcategory?.map((subcategory) => (
                            <Link
                                className={`blog-category-header p-2 px-3 mr-6 lg:mr-4 md:mb-2 md:mr-2 border-solid border-dark dark:border-light border-2p rounded font-medium last:mr-0
                                bg-transparent text-dark dark:text-light hover:cursor-pointer ${currentCategory === subcategory.subcategory_id ? "!bg-dark !text-light dark:!bg-light dark:!text-dark" : ""}`}
                                onClick={() => {
                                    switchCategory(subcategory.subcategory_id, subcategory.subcategory_name);
                                }}
                                to={`/blogs/category/${subcategory.subcategory_name}`}
                                key={subcategory.subcategory_id}
                            >
                                <h2 className="whitespace-nowrap">{subcategory.subcategory_name}</h2>
                            </Link>
                        ))
                    }
                </header>
                {
                    loading ?
                        <div className="flex justify-center items-center mt-4r">
                            <LoadingAnimation/>
                        </div>
                        :
                        <article
                            className="mt-8 grid w-full grid-cols-3 gap-16 xl:gap-12 sxl:gap-8  lg:grid-cols-2  md:grid-cols-1">
                            {
                                allDocument?.records?.map((record) => (
                                    <BlogArticleItemV2 record={record} key={record.id}/>
                                ))
                            }
                        </article>
                }
                <div className="w-full my-12 md:my-8">
                    <Pagination
                        onChange={handlePageChange}
                        total={allDocument?.total}
                        pageSize={9}
                        showSizeChanger={false}
                        showQuickJumper={false}
                        showLessItems
                        showTotal={(total) => `共 ${total} 条`}
                        className="text-dark dark:text-light flex items-center justify-center w-full"
                    />
                </div>
            </div>
        </>
    );
};

export default BlogArticleCategory;