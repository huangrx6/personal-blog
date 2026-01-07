const allColor = {
    // dark
    'dark': 'rgba(34, 34, 34)',
    'dark-0': 'rgba(34, 34, 34, 0)',
    'dark-10': 'rgba(34, 34, 34, .10)',
    'dark-50': 'rgba(34, 34, 34, .55)',
    'dark-60': 'rgba(34, 34, 34, .60)',
    'dark-mode': 'rgba(18, 18, 18)',

    // light
    'light': 'rgba(248, 249, 250)',
    'light-0': 'rgba(248, 249, 250, 0)',
    'light-10': 'rgba(248, 249, 250, .10)',
    'light-50': 'rgba(248, 249, 250, .55)',
    'light-60': 'rgba(248, 249, 250, .60)',
    'light-mode-one': 'rgba(243, 243, 243)',
    'light-mode-two': 'rgb(255,228,204)',


    'green-one': 'rgb(241, 253, 243)',
    'green-two': 'rgb(229, 244, 231)',
    'green-three': 'rgb(209, 233, 210)',
    'green-four': 'rgb(153, 205, 169)',

    'pink-one': 'rgb(249, 245, 246)',
    'pink-two': 'rgb(248, 232, 238)',
    'pink-three': 'rgb(253, 206, 223)',
    'pink-four': 'rgb(242, 190, 209)',
    'pink-five': 'rgba(254,198,208)',

    'orange-one': 'rgb(255,225,189)',
    'orange-two': 'rgb(255,204,154)',
    'orange-three': 'rgb(255,185,123)',
    'orange-four': 'rgb(255, 169, 82)',

    'purple-one': 'rgb(241, 241, 246)',
    'purple-two': 'rgb(225, 204, 236)',
    'purple-three': 'rgb(201, 182, 228)',
    'purple-four': 'rgb(190, 159, 225)',

    'beige-two': 'rgba(196,223,223)',
}

const allDropShadow = {
    "dark": "0 2px 0 rgba(34, 34, 34)",
}

const allSize = {
    "0": '0',

    "2p": '2px',
    "4p": '4px',
    "5p": '5px',
    "6p": '6px',
    "8p": '8px',
    "10p": '10px',
    "12p": '12px',

    "06r": "0.6rem",
    "08r": '0.8rem',
    "1.2r": '1.2rem',
    "1.4r": '1.4rem',
    "1.6r": '1.6rem',
    "1r": '1rem',
    "2r": '2rem',
    "4r": '4rem',
    "6r": '6rem',
    "8r": '8rem',
    "10r": '10rem',
    "12r": '12rem',
    "14r": '14rem',
    "16r": '16rem',

    "1/10": "10%",
    "1/5": "20%",
    "3/10": "30%",
    "2/5": "40%",
    "1/2": "50%",
    "3/5": "60%",
    "7/10": "70%",
    "4/5": "80%",
    "9/10": "90%",
    "full": "100%",

    "screen-vh": "100vh",
    "screen-vw": "100vw"
};

module.exports = {
    content: [
        './src/page/**/*.{js,ts,jsx,tsx,mdx}',
        './src/component/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        screens: {
            // 将断点设定为 max-width（允许页面的最大值）
            // 即页面宽度小于特定值时，样式才起作用
            '2xl': {'max': '1535px'},
            // => @media (max-width: 1535px) { ... }

            'xl': {'max': '1279px'},
            // => @media (max-width: 1279px) { ... }

            'sxl': {'max': '1179px'},
            // => @media (max-width: 1279px) { ... }

            'lg': {'max': '1023px'},
            // => @media (max-width: 1023px) { ... }

            'slg': {'max': '947px'},
            // => @media (max-width: 1023px) { ... }

            'xslg': {'max': '867px'},
            // => @media (max-width: 1023px) { ... }

            'md': {'max': '767px'},
            // => @media (max-width: 767px) { ... }

            'sm': {'max': '639px'},
            // => @media (max-width: 639px) { ... }

            'xsm': {'max': '479px'},
            // => @media (max-width: 639px) { ... }

            'lxs': {'max': '379px'},
            // => @media (max-width: 639px) { ... }

            'xs': {'max': '320px'},
            // => @media (max-width: 639px) { ... }
        },
        fontFamily: {
            lilita: ['Lilita One', 'cursive'],
            kuaile: ['ZCOOL KuaiLe', 'sans-serif'],
            pf: ['PingFang SC', 'sans-serif']
        },
        width: allSize,
        height: allSize,
        extend: {
            blur: allSize,
            fontSize: allSize,
            borderWidth: allSize,
            stroke: allColor,
            padding: allSize,
            margin: allSize,
            right: allSize,
            borderRadius: allSize,
            lineHeight: allSize,
            textColor: allColor,
            backgroundColor: allColor,
            borderColor: allColor,
            dropShadow: allDropShadow,
            fill: allColor,
            textDecorationColor: allColor,
            translate: allSize,
            zIndex: {
                51: '51',
                52: '52',
                53: '53',
                54: '54',
            },
            transitionTimingFunction: {
                'custom-one': 'cubic-bezier(0.8, 0.15, 0.26, 0.91)'
            },
            backgroundSize: allSize,
            backgroundImage: {
                'about-paper': 'url("https://huangrx.cn/img/about-paper.png")',
                'about-dian-light': 'url("https://huangrx.cn/svg/about-dian-light.svg")',
                'about-dian-dark': 'url("https://huangrx.cn/svg/about-dian.svg")',
            },
            keyframes: {
                moveLeft: {
                    '0%': {left: '100%'},
                    '100%': {left: '-50%'},
                },
                tipRight: {
                    '0%': {transform: 'skew(20deg,0deg) translateX(-20%)'},
                    '100%': {transform: 'skew(20deg,0deg) translateX(120%)'},
                }
            },
            animation: {
                moveLeft: 'moveLeft 15s linear infinite',
                tipRight: 'tipRight 5s infinite'
            }
        },
    },
    plugins: [],
};