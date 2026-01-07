import React, {useRef} from 'react';
import LazyImage from "../../component/LazyImage";
import useIntersectionObserver from "../../component/Observer";
import AboutSkills from "../../component/AboutSkills";

const About = () => {

    const basicInfoRef = useRef<HTMLDivElement>(null);
    const projectInfoRef = useRef<HTMLDivElement>(null);
    useIntersectionObserver(basicInfoRef, 'scale-up-hor-left');
    useIntersectionObserver(projectInfoRef, 'scale-up-hor-right');

    return (
        <div>
            <div className="sm:px-4 mx-1/10 2xl:mx-6r xl:mx-4r lg:mx-2r md:mx-0 font-extrabold font-kuaile text-6r 2xl:text-4r md:text-1.6r text-center leading-3r text-dark dark:text-light">
                <div className="flex flex-col  py-8r md:py-4r relative">

                    <div className="font-pf text-08r mb-6r md:mb-4r">
                        <p className="">现在的清晨，你我站在同一个门口</p>
                    </div>

                    <div className="w-full flex justify-between ">
                        <div className="w-2/5">
                            <div className="w-full flex justify-center">
                                <p style={{writingMode: 'vertical-lr', textOrientation: 'upright'}}>关于我</p>
                            </div>
                            <div className="w-full flex justify-center mt-4r xl:mt-2r">
                                <div className="w-8r h-8r xl:w-4r xl:h-4r md:w-2r md:h-2r rotate-center">
                                    <LazyImage url={'https://huangrx.cn/svg/flower.svg'}/>
                                </div>
                            </div>
                        </div>
                        <div className="w-3/5 md:w-full relative">
                            <LazyImage url={'https://huangrx.cn/img/about-rose.jpg'}/>

                            <div
                                className="w-8r absolute -bottom-[4rem] -left-[6rem] 2xl:w-6r  2xl:-bottom-[3rem] 2xl:-left-[3rem] md:w-2r md:-bottom-[1rem] md:-left-[1rem]">
                                <LazyImage url='https://huangrx.cn/svg/leaf.svg'/>
                            </div>
                        </div>
                    </div>

                    <div className=" mt-6r md:mt-4r w-full">
                        <LazyImage url='https://huangrx.cn/svg/about-view.svg'/>
                    </div>

                    <div
                        className="relative w-full mt-4r relative text-4r 2xl:text-2r md:text-1r p-4r md:p-2r leading-[8rem] 2xl:leading-[4rem] md:leading-[2rem] bg-cover bg-no-repeat bg-center bg-about-dian-dark dark:bg-about-dian-light">
                        <div>
                            <p>来自历史悠久的中国河南，23岁</p>
                            <p>目前是一名Java后端开发工程师</p>
                            <p>本科学历</p>
                            <p>现已工作两年</p>
                            <p>参与开发多个项目，包括商城、收银等</p>
                            <p>对待编程，热爱且积极</p>
                        </div>

                        {/*<div className="absolute top-[-2rem] left-[5%] rotate-[-24deg] w-6r 2xl:w-4r md:w-1.6r">*/}
                        {/*    <LazyImage url='https://huangrx.cn/svg/about-drink.svg'/>*/}
                        {/*</div>*/}
                        <div className="absolute bottom-0 left-[5%] w-6r 2xl:w-4r md:w-1.6r">
                            <LazyImage url='https://huangrx.cn/svg/about-slipper.svg'/>
                        </div>
                        <div className="absolute top-[-1rem] right-[5%] w-6r 2xl:w-4r md:w-1.6r">
                            <LazyImage url='https://huangrx.cn/svg/about-swim-ring.svg'/>
                        </div>
                        {/*<div className="absolute bottom-0 right-[5%] w-6r 2xl:w-4r md:w-1.6r">*/}
                        {/*    <LazyImage url='https://huangrx.cn/svg/about-bird.svg'/>*/}
                        {/*</div>*/}
                    </div>



                    <div className="text-1.4r 2xl:text-1r md:text-06r font-pf w-4/5 mt-4r flex mx-auto">
                        <AboutSkills/>
                    </div>

                    {/*<div className="w-full mt-6r md:mt-4r bg-no-repeat bg-full bg-about-paper bg-center px-1/5  py-6r 2xl:py-4r md:py-[3rem] relative">*/}
                    {/*    /!*<div*!/*/}
                    {/*    /!*    className="w-8r absolute -bottom-[2rem] -right-[2rem] xl:w-6r md:w-4r md:right-0">*!/*/}
                    {/*    /!*    <LazyImage url='https://huangrx.cn/svg/leaf2.svg' />*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*</div>*/}
                </div>

            </div>
        </div>

    );
};

export default About;
