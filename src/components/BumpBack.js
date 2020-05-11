import React, { Component } from 'react';

import '../css/BumpBack.css';

import Die from './Die';
import Button from './Button';
import Strip from './Strip';

class BumpBack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            die1: 0,
            die2: 0
        }

        //random number generator [min, max]
        this.RNG = (min,max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        this.DiceRoll = () => {
            this.setState({
                die1: this.RNG(1,6),
                die2: this.RNG(1,6)
            })
        }
    }

    render() {
        return (
            <div id="bump-back">
                <div className="game-menu">
                    <div className="active-player"></div>
                    <Die dotCnt={this.state.die1} />
                    <Die dotCnt={this.state.die2} />
                    <Button role="roll" clickHandler={this.DiceRoll}/>
                </div>
                <Strip />
            </div>
        );
    }
}

export default BumpBack;