import React, { Component } from 'react';

import '../css/BumpBack.css';
import '../css/GameMenu.css';
import '../css/Strip.css';
import '../css/Block.css';

import Die from './Die';
import Button from './Button';
import Player from './Player';


class BumpBack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            die1: 0,
            die2: 0,
            active_player: 0,
        }

        

        this.x = 'start 1 2 3 4 5 6 7 8 9 10 11 12';
        this.blocks = this.x.split(' ');

        //random number generator [min, max]
        this.RNG = (min,max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        this.DiceRoll = this.DiceRoll.bind(this);
    }

    player_list = [
        {
            name: "kevin",
            pos: "start",
            color: "orange"
        },
        {
            name: "bob",
            pos: "start",
            color: "green"
        }
    ]

    DiceRoll = () => {
        //get dice roll
        let _die1 = this.RNG(1,6);
        let _die2 = this.RNG(1,6);
        //set player pos from dice roll
        this.player_list[this.state.active_player].pos = _die1 + _die2;
        //get the next player
        let newActivePlayer = (this.state.active_player + 1) % this.player_list.length;

        this.setState({
            //set dice roll
            die1: _die1,
            die2: _die2,
            //set new active player
            active_player: newActivePlayer,
        })
    }

    render() {
        let p = [];
        for (let i = 0; i < this.blocks.length; i++) {
            p[i] = [];
            // look at each player
            for (let j = 0; j < this.player_list.length; j++) {
                
                //if the positions are the same
                if (this.blocks[i] === this.player_list[j].pos.toString()) {
                    p[i].push(this.player_list[j].name);
                } else {
                    p[i].push();
                }
            }
        }
        //p is the current player positions
        
        return (
            <div id="bump-back">
                <div className="game-menu">
                    <div className="active-player">Turn: {this.player_list[this.state.active_player].name}</div>
                    <div className="dice">
                        <Die dotCnt={this.state.die1} />
                        <Die dotCnt={this.state.die2} />
                    </div>
                    <Button role="roll" clickHandler={this.DiceRoll}/>
                </div>
                <div className="strip">
                    {p.map( (players, n) => {
                        let blockClass = (n === 0) ? 'start' : n.toString();
                        return (<div className={`block ${blockClass}`}>
                                    {blockClass}
                                    <div className="overlay">
                                        {players.map( (name) => {
                                            let bg;
                                            for (let i = 0; i < this.player_list.length; i++) {
                                                if (this.player_list[i].name === name) {
                                                    bg = this.player_list[i].color;
                                                    break;
                                                }
                                            }
                                            return (<Player bg={bg}/>)
                                        })}
                                    </div>
                                </div>)
                    })}
                </div>
            </div>
        );
    }
}

export default BumpBack;