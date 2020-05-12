import React from 'react';

import '../css/Difficulty.css';

const Difficulty = (props) => {
    return (
        <div className="difficulty">
            <div className="heading">
                difficulty
            </div>
            <div className="setting-wrapper">
                <div className="setting" onClick={props.changeDifficulty('e')}>E</div>
                <div className="setting" onClick={props.changeDifficulty('m')}>M</div>
                <div className="setting" onClick={props.changeDifficulty('h')}>H</div>
            </div>
        </div>
    );
};

export default Difficulty;