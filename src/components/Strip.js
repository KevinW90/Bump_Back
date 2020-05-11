import React from 'react';

import '../css/Strip.css';

import Block from './Block';


const Strip = () => {
    let x = 'start 1 2 3 4 5 6 7 8 9 10 11 12';
    const blocks = x.split(' ');

    return (
        <div className="strip">
            {blocks.map( (b, index) => {
                return (<Block blockText={b} key={`${b}${index}`}/>)
            })}
        </div>
    );
};

export default Strip;