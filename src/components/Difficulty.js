import React from 'react';

import '../css/Difficulty.css';

const Difficulty = (props) => {
    const {changeDifficulty} = props; //destructure
    return (
        <div className="difficulty">
            <div className="heading">
                difficulty
            </div>
            <div className="setting-wrapper">
                <div className="setting" 
                     onClick={() => changeDifficulty('E')}>E</div>
                <div className="setting" 
                     onClick={() => changeDifficulty('M')}>M</div>
                <div className="setting" 
                     onClick={() => changeDifficulty('H')}>H</div>
            </div>
        </div>
    );
};

export default Difficulty;