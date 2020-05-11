import React from 'react';

import '../css/Button.css';

const Button = (props) => {
    return (
        <div className="btn" id="roll" onClick={props.clickHandler}>
            roll
        </div>
    );
};

export default Button;