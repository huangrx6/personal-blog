import React, {useEffect, useState} from 'react';
import {useStateContext} from "../../contexts/ContextProvider";
import {CgMenuMotion} from "react-icons/cg";
import {IoMdClose} from "react-icons/io";
import {Link} from "react-router-dom";
import LazyImage from "../LazyImage";
import {BsTencentQq} from "react-icons/bs";
import {RiGithubFill, RiWechatFill} from "react-icons/ri";

const NavBar: React.FC = () => {

    const {
        currentMode,
        setMode,
        currentColor,
        setColor,
        navPersonBg,
        setNavPersonBg,
        setNavBrushBg
    } = useStateContext();

    const [menuFlag, setMenuFlag] = useState<boolean>(false);

    useEffect(() => {
        const currentThemeMode = localStorage.getItem('themeMode');
        const currentColorMode = localStorage.getItem('colorMode');
        if (currentThemeMode && currentColorMode) {
            setMode(currentThemeMode);
            setColor(currentColorMode);
        }
    }, [currentMode, setMode, currentColor, setColor, setNavBrushBg]);

    const switchThemeMode = (themeMode: string, currentColor: string, navPersonBgUrl: string, navBrushBgUrl: string) => {
        setMode(themeMode);
        setColor(currentColor);
        setNavPersonBg(navPersonBgUrl);
        localStorage.setItem("NAV_BG", navPersonBgUrl)
        setNavBrushBg(navBrushBgUrl);
        localStorage.setItem("NAV_BRUSH_BG", navBrushBgUrl)
        setMenuFlag(!menuFlag);
    }

    const switchMenuButton = () => {
        setMenuFlag(!menuFlag);
    }

    return (
        <>
            <header
                className="fixed flex flex-col items-center w-screen-vw bg-light-mode-one text-dark dark:bg-dark-mode dark:text-light z-50">
                <div
                    className={`w-full relative flex items-center justify-between h-[4rem] 2xl:h-[3.6rem] md:h-[3.2rem]  px-16 lg:px-14 md:px-12 sm:px-4 z-52 `}>
                    <Link to="/">
                        <span className="font-lilita text-dark dark:text-light text-2r 2xl:text-1.6r md:text-1.2r">Huangrx</span>
                    </Link>
                    {
                        !menuFlag ?
                            <div className="flex items-center navbar-open-menu h-full">
                                <CgMenuMotion
                                    className="ml-2r w-2r 2xl:w-1.6r md:w-1.2r h-full hover:cursor-pointer transform ease-in-out duration-300"
                                    onClick={switchMenuButton}/>
                            </div>
                            :
                            <div className="flex items-center navbar-close-menu">
                                <IoMdClose
                                    className="ml-2r w-2r 2xl:w-1.6r md:w-1.2r h-full hover:cursor-pointer transform ease-in-out duration-300"
                                    onClick={switchMenuButton}/>
                            </div>
                    }
                </div>
                <span className={`${menuFlag ? 'opacity-100  delay-500' : 'opacity-0'} absolute left-0 top-full w-full rounded-md bg-dark dark:bg-light h-2p transform ease-in duration-300 z-52`}>&nbsp;</span>
                <div className={`${menuFlag ? 'translate-y-0' : 'translate-y-full'} fixed top-0  w-screen-vw h-screen-vh flex flex-row z-51 transform ease-out duration-500 overflow-hidden`}>
                    <nav
                        className={`w-1/2 md:w-full flex flex-col justify-start bg-light dark:bg-dark text-dark dark:text-light py-[4rem] 2xl:py-[3.6rem] md:py-[3.2rem] px-16 lg:px-14 md:px-12 sm:px-4 font-bold font-kuaile bg-cover bg-center`}
                        style={{backgroundImage: navPersonBg}}>
                        <div className="w-full flex flex-row justify-between text-1.4r md:text-1r pt-4r 2xl:pt-2r">
                            <div className="w-1/2 flex flex-row">
                                <div className="flex flex-col justify-start">
                                    <div className="text-1r md:text-08r font-medium p-3">
                                        <span>本站导航</span>
                                    </div>
                                    <Link
                                        className="hover-brush-bg bg-full bg-center bg-no-repeat p-3"
                                        to="/" onClick={switchMenuButton}>
                                        <span>主页</span>
                                    </Link>
                                    <Link
                                        className="hover-brush-bg bg-full bg-center bg-no-repeat p-3"
                                        to="/blogs/category/all" onClick={switchMenuButton}>
                                        <span>文章分类</span>
                                    </Link>
                                    <Link
                                        className="hover-brush-bg bg-full bg-center bg-no-repeat p-3"
                                        to="/daily" onClick={switchMenuButton}>
                                        <span>日常点滴</span>
                                    </Link>
                                    <Link
                                        className="hover-brush-bg bg-full bg-center bg-no-repeat p-3"
                                        to="/about" onClick={switchMenuButton}>
                                        <span>关于我</span>
                                    </Link>
                                </div>
                                <div/>
                            </div>
                            <div className="w-1/2 flex flex-row">
                                <div className="flex flex-col  ">
                                    <div className="text-1r md:text-08r font-medium p-3">
                                        <span>友情连接</span>
                                    </div>
                                    <a className="flex items-center gap-3 hover-brush-bg bg-full bg-center bg-no-repeat p-3"
                                       href="https://github.com/hrenxiang">
                                        <RiGithubFill/>
                                        <span>GitHub</span>
                                    </a>
                                    <a
                                        className="hover:cursor-pointer flex items-center gap-3  hover-brush-bg bg-full bg-center bg-no-repeat p-3"
                                        href="weixin://dl/business/">
                                        <RiWechatFill/>
                                        <span>WeChat</span>
                                    </a>
                                    <a
                                        className="hover:cursor-pointer flex items-center gap-3 hover-brush-bg bg-full bg-center bg-no-repeat p-3"
                                        href="tencent://message/?uin=2295701930">
                                        <BsTencentQq/>
                                        <span>Q Q</span>
                                    </a>
                                </div>
                                <div></div>
                            </div>
                        </div>
                        <div className="w-full mt-4r 2xl:mt-2r">
                            <div className="flex flex-col text-1.4r md:text-1r">
                                <div className="text-1r md:text-08r font-medium p-3">
                                    <span>主题</span>
                                </div>

                                <div className="flex items-center">
                                    <span
                                        className="p-3 hover:cursor-pointer hover-brush-bg bg-full bg-center bg-no-repeat "
                                        onClick={() => switchThemeMode(
                                            "Light",
                                            '#FEC6D0FF',
                                            'url("https://huangrx.cn/img/nav-left-pink.png")',
                                            'url("https://huangrx.cn/img/nav-brush-pink.png")'
                                        )}
                                    >
                                        樱花
                                    </span>
                                    <span
                                        className="p-3 hover:cursor-pointer hover-brush-bg bg-full bg-center bg-no-repeat "
                                        onClick={() => switchThemeMode(
                                            "Light",
                                            '#C9B6E4FF',
                                            'url("https://huangrx.cn/img/nav-left-purple.png")',
                                            'url("https://huangrx.cn/img/nav-brush-purple.png")'
                                        )}
                                    >
                                        薰衣草
                                    </span>
                                    <span
                                        className="p-3 hover:cursor-pointer hover-brush-bg bg-full bg-center bg-no-repeat "
                                        onClick={() => switchThemeMode(
                                            "Dark",
                                            '#4d6653',
                                            'url("https://huangrx.cn/img/nav-left-green.png")',
                                            'url("https://huangrx.cn/img/nav-brush-green.png")'
                                        )}
                                    >
                                        黑鸢尾
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full mt-4r 2xl:mt-2r">
                            <div className="flex flex-col text-1.4r md:text-1r">
                                <div className="text-1r md:text-08r font-medium p-3">
                                    <span>我的其他</span>
                                </div>

                                <div className="flex items-center">
                                    <a
                                        className="p-3 hover:cursor-pointer hover-brush-bg bg-full bg-center bg-no-repeat "
                                        href="https://chat.huangrx.cn"
                                    >
                                        ChatAI
                                    </a>

                                    <a
                                        className="p-3 hover:cursor-pointer hover-brush-bg bg-full bg-center bg-no-repeat "
                                        href="https://profile.huangrx.cn"
                                    >
                                        简历主页
                                    </a>
                                </div>

                            </div>
                        </div>
                    </nav>

                    <div className={`relative w-1/2 md:hidden flex items-center justify-center`}
                         style={{backgroundColor: currentColor}}>
                        <div className=" w-4/5 ">
                            <LazyImage url={'https://huangrx.cn/img/nav-disc.png'}
                                       borderRadius="1rem"/>
                        </div>

                        <span
                            className={`absolute left-0 top-0 w-2p h-full bg-light dark:bg-dark rounded-md blur blur-2p h-2p transform ease-in duration-500 z-52`}>&nbsp;</span>
                    </div>
                </div>
            </header>
        </>
    );
};

export default NavBar;