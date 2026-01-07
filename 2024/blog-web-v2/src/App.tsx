import React, {useEffect} from 'react';
import "./App.css";
import {useStateContext} from "./contexts/ContextProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import routers from "./router/Router";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import {ArticleMarkdownStyles, GlobalStyles} from "./component/SingleComponentStyles";

const App: React.FC = () => {

    const {
        currentMode,
        setCurrentMode,
        setNavPersonBg,
        setNavBrushBg
    } = useStateContext();

    useEffect(() => {
        const currentThemeMode = localStorage.getItem('themeMode');
        const currentNavBg = localStorage.getItem('NAV_BG');
        const currentNavBrushBg = localStorage.getItem('NAV_BRUSH_BG');
        if (currentThemeMode) {
            setCurrentMode(currentThemeMode);
        }
        if (currentNavBg) {
            setNavPersonBg(currentNavBg);
        }
        if (currentNavBrushBg) {
            setNavBrushBg(currentNavBrushBg);
        }
    }, [currentMode, setCurrentMode,setNavPersonBg, setNavBrushBg]);

    return (
        <>
            <GlobalStyles/>
            <ArticleMarkdownStyles/>
            <div className={`${currentMode === "Dark" ? 'dark' : ''} `}>
                <BrowserRouter>
                    <NavBar/>
                    <div className="bg-light-mode-one dark:bg-dark-mode text-dark dark:text-light min-h-screen font-pf mb-[-1px]">
                        <Routes>
                            {routers.map((route, index) => (
                                <Route key={index} path={route.path} element={route.element} />
                            ))}
                        </Routes>
                    </div>
                    <Footer/>
                </BrowserRouter>
            </div>
        </>
    );
};

export default App;
