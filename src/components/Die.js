import React from 'react';

import '../css/Die.css';

import Dot from './Dot';

const Die = (props) => {
    let dots = [];
    for (let i = 1; i <= props.dotCnt; i++) {
        dots.push('x');
    }

    return (
        <div className="die">
            <div className="die-face">
                {dots.map( (_,index) => {
                    return(<Dot key={index}/>)
                })}
            </div>   
        </div>
    );
};

export default Die;