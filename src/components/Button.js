import React from 'react';

import '../css/Button.css';

const Button = (props) => {
    return (
        <div className="btn" id="roll" onClick={props.clickHandler} style={{background: props.bg}}>
            roll
        </div>
    );
};

export default Button;