import React, {useEffect, useRef, useState} from 'react';
import {RiGithubLine, RiQqLine, RiWechatLine} from "react-icons/ri";
import {Modal} from "antd";

import {useStateContext} from "../../contexts/ContextProvider";


const Footer = () => {

    const {
        currentMode,
        setCurrentMode,
        currentColor
    } = useStateContext();

    useEffect(() => {
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeMode) {
            setCurrentMode(currentThemeMode);
        }

    }, [currentMode, setCurrentMode]);

    const [state, setState] = useState({
        isModalOpen: false,
        isWeChat: false
    });

    const showModal = (param: string) => {
        let flag = false;
        if ("wechat" === param) {
            flag = true;
        }
        setState({
            isModalOpen: true,
            isWeChat: flag
        });
    };

    const handleOk = () => {
        setState((prevState) => ({
            ...prevState,
            isModalOpen: false
        }))
    };

    const handleCancel = () => {
        setState((prevState) => ({
            ...prevState,
            isModalOpen: false
        }))
    };

    const footerTitleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentSectionRef = footerTitleRef.current;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                currentSectionRef?.querySelector("a")?.classList.add("tracking-in-contract-bck")
                currentSectionRef?.querySelector("h3")?.classList.add("tracking-in-contract-bck")
            } else {
                currentSectionRef?.querySelector("a")?.classList.remove("tracking-in-contract-bck")
                currentSectionRef?.querySelector("h3")?.classList.remove("tracking-in-contract-bck")
            }
        });

        if (currentSectionRef) {
            observer.observe(currentSectionRef);
        }

        return () => {
            if (currentSectionRef) {
                observer.unobserve(currentSectionRef);
            }
        };
    }, []);



    return (
        <footer className="bg-light-mode-one dark:bg-dark-mode">
            <div
                className=" text-dark dark:text-light pt-6r md:pt-4r px-16 lg:px-14 md:px-12 sm:px-4"
                style={{
                    clipPath: "polygon(0px 10%, 20% 0px, 100% 20%, 100% 100%, 0px 100%)",
                    backgroundColor: currentColor
                }}
            >
                <div className="flex w-full items-center flex-col">
                    <div className="flex flex-row items-center gap-5"  ref={footerTitleRef}>
                        <a href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"
                                 className="h-auto w-2r md:w-1.4r fill-dark dark:fill-light">
                                <rect width="160" height="160" rx="15" ry="15"/>
                                <text x="82" y="90" fontSize="120" textAnchor="middle" strokeWidth="1"
                                      dominantBaseline="middle"
                                      className=" fill-dark dark:fill-light stroke-light dark:stroke-dark">H
                                </text>
                                <text x="80" y="89" fontSize="120" fill="#fff" textAnchor="middle"
                                      dominantBaseline="middle" className="fill-light dark:fill-dark">H
                                </text>
                            </svg>
                        </a>
                        <h3 className="text-2r md:text-1r font-lilita">Love and Being Loved.</h3>
                    </div>
                    <div className="flex text-xl gap-8 my-4r md:my-2r text-1r md:text-06r">
                        <a href="https://github.com/hrenxiang" target="_blank " rel="noreferrer">
                            <button className="flex items-center text-1rem group relative">
                                <div className="mr-1 h-auto w-1.6r md:w-1.4r p-1 rounded-4p">
                                    <RiGithubLine className=" fill-dark dark:fill-light w-full h-full"/>
                                </div>
                                <span>Github</span>
                                <span
                                    className={`absolute left-0  top-[100%] rounded-md h-2p ease w-0 rounded-md transition-all duration-200 group-hover:w-full bg-dark dark:bg-light`}>&nbsp;</span>
                            </button>
                        </a>

                        <button className="flex items-center text-1rem group relative"
                                onClick={() => {
                                    showModal("wechat")
                                }}>
                            <div className="mr-1 h-auto w-1.6r md:w-1.4r p-1 rounded-4p">
                                <RiQqLine className=" fill-dark dark:fill-light w-full h-full"/>
                            </div>
                            <span>WeChat</span>
                            <span
                                className={`absolute left-0  top-[100%] rounded-md h-2p ease w-0 rounded-md transition-all duration-200 group-hover:w-full bg-dark dark:bg-light`}>&nbsp;</span>
                        </button>

                        <button className="flex items-center text-1rem group relative"
                                onClick={() => {
                                    showModal("qq")
                                }}>
                            <div className="mr-1 h-auto w-1.6r md:w-1.4r p-1 rounded-4p">
                                <RiWechatLine className=" fill-dark dark:fill-light w-full h-full"/>
                            </div>
                            <span>QQ</span>
                            <span
                                className={`absolute left-0  top-[100%] rounded-md h-2p ease w-0 rounded-md transition-all duration-200 group-hover:w-full bg-dark dark:bg-light`}>&nbsp;</span>
                        </button>

                    </div>
                    <hr className="my-4r md:my-2r h-px w-full border-0 bg-light-50 dark:bg-dark-50"/>
                    <div
                        className="w-full flex items-center justify-between text-1r md:text-06r text-dark dark:text-light font-lilita mb-4r md:mb-2r">
                        <a href="https://beian.miit.gov.cn/#/Integrated/index"
                           target="_blank"
                           rel="noreferrer"
                           className="underline-offset-4 hover:underline">
                            <p>&copy; 豫ICP备2022017977号</p>
                        </a>
                        <p>Author Huangrx🍃</p>
                    </div>
                </div>

                <Modal title="天选的缘分啊！"
                       open={state.isModalOpen}
                       onOk={handleOk}
                       onCancel={handleCancel}
                       okText="好的"
                       cancelText="下次啦"
                >
                    <div>

                        {/*{*/}
                        {/*    state.isWeChat ?*/}
                        {/*        <div>*/}
                        {/*            <p> 微信号： 扫码更快哦！</p>*/}
                        {/*            <p> 去扫码 </p>*/}
                        {/*        </div>*/}
                        {/*        :*/}
                        {/*        <p> QQ号： 2295701930</p>*/}
                        {/*}*/}

                        {
                            state.isWeChat ?
                                <img
                                    src="https://huangrx.cn/img/wechat-qr-code.jpg"
                                    style={{width: "100%"}} alt="wechat"/>
                                :
                                <img
                                    src="https://huangrx.cn/img/qq-qr-code.png"
                                    style={{width: "100%"}} alt="qq"/>
                        }
                    </div>
                </Modal>

            </div>
        </footer>
    );
};

export default Footer;
