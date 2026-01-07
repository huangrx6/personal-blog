import React from 'react';
import Backend from "./Backend";
import Frontend from "./Frontend";

const AboutSkills = () => {
    return (
        <div className="flex flex-row md:flex-col gap-16 justify-center w-full">
            <Frontend/>
            <Backend/>
        </div>
    );
};

export default AboutSkills;