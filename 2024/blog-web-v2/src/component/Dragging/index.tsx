import React from 'react';

interface Position {
    x: number;
    y:number;
    opacity: number;
}


const Draggable: React.FC<Position> = ({x, y, opacity}) => {

    return (
        <div className="draggable">
            <div className="draggable-body" style={{transform: `translate3d(${x}px, ${y}px, 0px)`,opacity: opacity}}></div>
        </div>
    );
};

export default Draggable;