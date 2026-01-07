import React from 'react';
import {BiBadgeCheck} from "react-icons/bi";
import {useStateContext} from "../../contexts/ContextProvider";

const Frontend = () => {

    const date = [
        {
            'name': 'HTML',
            'level': 'Basic'
        },
        {
            'name': 'CSS',
            'level': 'Advanced'
        },
        {
            'name': 'JavaScript',
            'level': 'Intermediate'
        }
    ]

    const date2 = [
        {
            'name': 'Bootstrap',
            'level': 'Basic'
        },
        {
            'name': 'React',
            'level': 'Intermediate'
        },
        {
            'name': 'VUE',
            'level': 'Intermediate'
        }
    ]

    const {currentColor} = useStateContext();

    return (
        <>
            <div className="border-[1px] border-solid border-dark dark:border-light relative z-[2]">
                <div className="w-full grid grid-cols-2 gap-8 p-4r md:p-2r">

                    <div className="flex flex-col gap-4 justify-center">

                        {
                            date.map((record, index) => (
                                <div className="flex flex-row justify-start gap-4 md:gap-2" key={record.name}>
                                    <div className="pt-06r md:pt-4p">
                                        <BiBadgeCheck/>
                                    </div>

                                    <div>
                                        <h3 className="text-left">{record.name}</h3>
                                        <div className="w-full text-left">{record.level}</div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>

                    <div className="flex flex-col gap-4">

                        {
                            date2.map((record, index) => (
                                <div className="flex flex-row justify-start gap-4 md:gap-2" key={record.name}>
                                    <div className="pt-06r md:pt-4p">
                                        <BiBadgeCheck/>
                                    </div>

                                    <div>
                                        <h3 className="text-left">{record.name}</h3>
                                        <div className="w-full text-left">{record.level}</div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>

                </div>

                <svg className="absolute bottom-0 w-full h-6r xl:h-4r z-[1]" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 24 150 28" preserveAspectRatio="none">
                    <defs>
                        <path id="gentle-wave"
                              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
                    </defs>
                    <g className="">
                        <use href="#gentle-wave" x="48" y="0" className="wave-forever" style={{
                            animationDelay: '-2s',
                            animationDuration: '7s',
                            fill: `rgba(${parseInt(currentColor.slice(1, 3), 16)}, ${parseInt(currentColor.slice(3, 5), 16)}, ${parseInt(currentColor.slice(5, 7), 16)}, 0.7)`
                        }}/>
                        <use href="#gentle-wave" x="48" y="3" className="wave-forever" style={{
                            animationDelay: '-3s',
                            animationDuration: '10s',
                            fill: `rgba(${parseInt(currentColor.slice(1, 3), 16)}, ${parseInt(currentColor.slice(3, 5), 16)}, ${parseInt(currentColor.slice(5, 7), 16)}, 0.5)`
                        }}/>
                        <use href="#gentle-wave" x="48" y="5" className="wave-forever" style={{
                            animationDelay: '-4s',
                            animationDuration: '13s',
                            fill: `rgba(${parseInt(currentColor.slice(1, 3), 16)}, ${parseInt(currentColor.slice(3, 5), 16)}, ${parseInt(currentColor.slice(5, 7), 16)}, 0.3)`
                        }}/>
                        <use href="#gentle-wave" x="48" y="7" className="wave-forever" style={{
                            animationDelay: '-5s',
                            animationDuration: '20s',
                            fill: `rgba(${parseInt(currentColor.slice(1, 3), 16)}, ${parseInt(currentColor.slice(3, 5), 16)}, ${parseInt(currentColor.slice(5, 7), 16)})`
                        }}/>
                    </g>
                </svg>
            </div>
        </>
    );
};

export default Frontend;