import React from 'react';

import '../css/Difficulty.css';

const Difficulty = (props) => {
    const {changeDifficulty} = props; //destructure
    return (
        <div className="difficulty">
            <div className="heading">
                # players
            </div>
            <div className="setting-wrapper">
                <div className="setting" 
                     onClick={() => changeDifficulty('E')}>2</div>
                <div className="setting" 
                     onClick={() => changeDifficulty('M')}>3</div>
                <div className="setting" 
                     onClick={() => changeDifficulty('H')}>4</div>
            </div>
        </div>
    );
};

export default Difficulty;