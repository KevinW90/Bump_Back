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
                     onClick={() => changeDifficulty('E')}
                     style={{background: "#4CAF50", opacity: .6}}>E</div>
                <div className="setting" 
                     onClick={() => changeDifficulty('M')}
                     style={{background: "yellow", opacity: .6}}>M</div>
                <div className="setting" 
                     onClick={() => changeDifficulty('H')}
                     style={{background: "red", opacity: .6}}>H</div>
            </div>
        </div>
    );
};

export default Difficulty;