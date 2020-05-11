import React from 'react';

import '../css/Block.css';

const Block = (props) => {
    return (
        <div className={`block ${props.blockText}`}>
            {props.blockText}
        </div>
    );
};

export default Block;