import React from 'react';
import {useStateContext} from "../../contexts/ContextProvider";

interface ArticleChipProps {
    label: string;
}

const ArticleChip: React.FC<ArticleChipProps> = ({
                                                     label,
                                                 }) => {
    const {currentColor} = useStateContext();
    return (
        <div className="flex w-full items-center justify-between">
            <span
                className={`w-max rounded-sm py-1 px-2 text-08r md:text-06r font-semibold uppercase text-dark dark:text-light flex-none`}
                style={{backgroundColor: currentColor}}>
                {label}
            </span>
        </div>
    );
};

export default ArticleChip;