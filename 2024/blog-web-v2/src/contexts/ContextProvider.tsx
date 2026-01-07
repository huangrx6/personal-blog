import React, {createContext, useContext, useState} from 'react';

interface StateContextProps {
    currentColor: string;
    currentMode: string;
    activeMenu: boolean;
    screenSize: any;
    setScreenSize: (size: any) => void;
    handleClick: (clicked: string) => void;
    isClicked: any;
    initialState: any;
    setIsClicked: (state: any) => void;
    setActiveMenu: (active: boolean) => void;
    setCurrentColor: (color: string) => void;
    setCurrentMode: (mode: string) => void;
    setMode: (mode: string) => void;
    setColor: (color: string) => void;
    themeSettings: boolean;
    setThemeSettings: (settings: boolean) => void;
    lightColor: string;
    setLightColor: (color: string) => void;
    darkColor: string;
    setDarkColor: (color: string) => void;
    readingTime: number;
    setReadingTime: (count: number) => void;
    navPersonBg: string;
    setNavPersonBg: (src: string) => void;
    navBrushBg: string;
    setNavBrushBg: (src: string) => void;
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
};

interface ContextProviderProps {
    children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({children}) => {
    const [screenSize, setScreenSize] = useState<any>(undefined);
    const [currentColor, setCurrentColor] = useState('#FEC6D0FF');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [lightColor, setLightColor] = useState('#fff');
    const [darkColor, setDarkColor] = useState('#000');
    const [readingTime, setReadingTime] = useState(0);
    const [navPersonBg, setNavPersonBg] = useState('url("https://huangrx.cn/img/nav-left-pink.png")');
    const [navBrushBg, setNavBrushBg] = useState('url("https://huangrx.cn/img/nav-brush-pink.png")');

    const setMode = (mode: string) => {
        setCurrentMode(mode);
        localStorage.setItem('themeMode', mode);
    };

    const setColor = (color: string) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
    };

    const handleClick = (clicked: string) => setIsClicked({...initialState, [clicked]: true});

    return (
        <StateContext.Provider
            value={{
                currentColor,
                currentMode,
                activeMenu,
                screenSize,
                setScreenSize,
                handleClick,
                isClicked,
                initialState,
                setIsClicked,
                setActiveMenu,
                setCurrentColor,
                setCurrentMode,
                setMode,
                setColor,
                themeSettings,
                setThemeSettings,
                lightColor,
                setLightColor,
                darkColor,
                setDarkColor,
                readingTime,
                setReadingTime,
                navPersonBg,
                setNavPersonBg,
                navBrushBg,
                setNavBrushBg
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = (): StateContextProps => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useStateContext must be used within a ContextProvider');
    }
    return context;
};
