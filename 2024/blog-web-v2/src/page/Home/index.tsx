import React, {useEffect, useRef, useState} from 'react';
import {useStateContext} from "../../contexts/ContextProvider";
import Draggable from "../../component/Dragging";
import useIntersectionObserver from "../../component/Observer";
import {api} from "../../api";
import {DocumentResponseRecord} from "../../api/path/document";
import BlogArticleItem from "../../component/ArticleItem/BlogArticleItem";
import LazyImage from "../../component/LazyImage";

const Home = () => {

    const {currentColor} = useStateContext();

    const {navBrushBg} = useStateContext();

    const [mousePosition, setMousePosition] = useState<{ x: number; y: number; opacity: number }>({
        x: 0,
        y: 0,
        opacity: 0
    });

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const {clientX, clientY} = event;
        setMousePosition({x: clientX, y: clientY, opacity: 1});
    };

    const handleMouseLeave = () => {
        setMousePosition({x: 0, y: 0, opacity: 0});
    }

    const latelyDocumentRef = useRef<HTMLDivElement>(null);
    useIntersectionObserver(latelyDocumentRef, 'slide-in-bottom', "p");
    useIntersectionObserver(latelyDocumentRef, 'slide-in-bottom', "div");

    const [latelyDocuments, setLatelyDocuments] = useState<DocumentResponseRecord[]>();

    useEffect(() => {
        api.acquireLatelyDocument(3).then((res) => {
            if (res[0]?.code === 0 || res[0]?.code === 200) {
                setLatelyDocuments(res[0]?.data)
            }
        })

        // 滚动到顶部
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])

    return (
        <div className="w-full z-[3]" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className=" pt-[4rem] 2xl:pt-[3.6rem] md:pt-[3.2rem] ">
                <div className="relative w-full overflow-hidden py-2 px-16 md:px-12 sm:px-4 text-center font-pf  text-dark dark:text-light"
                     style={{backgroundColor: currentColor}}>
                    <div className="animate-tipRight absolute top-0 left-0 w-full h-full">
                        <div className="will-change-transform w-[40px] h-full bg-transparent"
                             style={{
                                 backgroundImage: 'linear-gradient(270deg,hsla(0,0%,100%,.52) 34%, transparent 37%,transparent 77%,hsla(0,0%,100%,.64) 80%)',
                                 transform: 'skew(20deg,0deg)'
                             }}>

                        </div>
                    </div>
                    <div className="font-semibold text-08r md:text-06r font-medium">
                        <div>
                            Don't forget to read the article from the &nbsp;
                            <a className="capitalize underline" href="/blogs/category/all">article</a>
                            &nbsp; page that may be useful to you! 🎯
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4r md:mt-2r pb-6r px-16 md:px-12 sm:px-4 mx-1/5 2xl:mx-6r xl:mx-4r lg:mx-2r md:mx-0">
                <div
                    className="font-extrabold font-kuaile text-6r 2xl:text-4r md:text-1.6r text-center leading-3r text-dark dark:text-light">

                    <div className="flex flex-col items-center justify-center" style={{transform: "rotate(-6deg)"}}>
                        <p className="md:px-2r">欢迎来到我的频道!</p>
                        <p className="md:px-2r">热衷于前后端开发.🍕</p>

                        <a href="mailto:2295701930@qq.com" className="py-2r md:py-1r px-4r md:px-2r" style={{
                            backgroundImage: navBrushBg,
                            backgroundPosition: "center",
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat"
                        }}>联系我!</a>
                    </div>

                    <div className="w-full mt-4r md:mt-2r">
                        <video autoPlay={true} loop={true} muted={true}
                               src="https://huangrx.cn/video/home_video_2.mp4"></video>
                    </div>

                    <div
                        className="w-full flex justify-center flex-col mt-4r md:mt-2r text-2r 2xl:text-1.4r md:text-1r font-pf"
                        ref={latelyDocumentRef}>
                        <p className=" mx-auto font-kuaile text-6r 2xl:text-4r md:text-1.6r">
                            近期文章
                        </p>
                        <div>
                            {
                                latelyDocuments?.map((record) => (
                                    <BlogArticleItem record={record} key={record.id}/>
                                ))
                            }
                        </div>
                    </div>

                    <div className="w-full mt-2r md:mt-0 flex flex-col justify-center">
                        <p className=" mx-auto font-kuaile text-6r 2xl:text-4r md:text-1.6r">
                            近期公告
                        </p>
                        <div
                            className="relative mt-4r md:mt-2r w-4/5 mx-auto flex flex-col justify-center items-center site-home-participate text-light gap-4 py-2r"
                            style={{aspectRatio: "3/2"}}>
                            <div
                                className="w-full text-2r 2xl:text-1.4r md:text-1r flex items-center justify-center z-20 text-dark text-light">
                                <div><span className="text-1r 2xl:text-08r md:text-06r font-lilita">1&nbsp;.&nbsp;&nbsp;</span>添加编程工具解析页</div>
                            </div>
                            <div
                                className="w-full text-2r 2xl:text-1.4r md:text-1r flex items-center justify-center z-20 text-dark text-light">
                                <div><span className="text-1r 2xl:text-08r md:text-06r font-lilita">2&nbsp;.&nbsp;&nbsp;</span>添加学习视频推荐页</div>
                            </div>
                            <div
                                className="w-full text-2r 2xl:text-1.4r md:text-1r flex items-center justify-center z-20 text-dark text-light">
                                <div><span className="text-1r 2xl:text-08r md:text-06r font-lilita">3&nbsp;.&nbsp;&nbsp;</span>主页进行重构</div>
                            </div>
                            <div
                                className="w-full text-2r 2xl:text-1.4r md:text-1r flex items-center justify-center z-20 text-dark text-light">
                                <div><span className="text-1r 2xl:text-08r md:text-06r font-lilita">4&nbsp;.&nbsp;&nbsp;</span>日常点滴页重构</div>
                            </div>
                            {/*<div*/}
                            {/*    className="w-full text-2r 2xl:text-1.4r md:text-1r flex items-center justify-center z-20 text-dark text-light">*/}
                            {/*    <div>线下收银</div>*/}
                            {/*</div>*/}
                            {/*<div*/}
                            {/*    className="w-full text-2r 2xl:text-1.4r md:text-1r flex items-center justify-center z-20 text-dark text-light">*/}
                            {/*    <div>线上商城</div>*/}
                            {/*</div>*/}
                            {/*<div*/}
                            {/*    className="w-full text-2r 2xl:text-1.4r md:text-1r flex items-center justify-center z-20 text-dark text-light">*/}
                            {/*    <div>智能管家</div>*/}
                            {/*</div>*/}
                            <div className="w-1/5 absolute bottom-0 right-[-3rem] md:right-[-2rem] z-[2]">
                                <LazyImage url="https://huangrx.cn/img/home-kiss.png"/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Draggable x={mousePosition.x} y={mousePosition.y} opacity={mousePosition.opacity}/>
        </div>
    );
};

export default Home;