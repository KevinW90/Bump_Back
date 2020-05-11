import React from 'react';

const Player = (props) => {
    const style = {
        width: 30,
        height: 30,
        background: props.bg,
        borderRadius: 50,
        opacity: .9
    }

    return (
        <div className="player" style={style}>
                
        </div>
    );
}

export default Player;