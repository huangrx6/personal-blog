import React from 'react';
import loadingAnimation from "../../assets/animation/loading.json";
// @ts-ignore
import {useLottie} from "lottie-react";

const LoadingAnimation = () => {


    const snowOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const {View: snowLottie} = useLottie(snowOptions);

    return (
        <div>
            {snowLottie}
        </div>
    );
};

export default LoadingAnimation;