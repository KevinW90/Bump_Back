import React, { Component } from 'react';

import '../css/BumpBack.css';
import '../css/Strip.css';
import '../css/Block.css';

import Die from './Die';
import Button from './Button';
import Player from './Player';


class BumpBack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // game_over: false,
            die1: 0,
            die2: 0,
            active_player: 0,
            who_rolled: null
        }

        

        this.x = 'start 1 2 3 4 5 6 7 8 9 10 11 12';
        this.blocks = this.x.split(' ');

        //random number generator [min, max]
        this.RNG = (min,max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        this.DiceRoll = this.DiceRoll.bind(this);
        this.Bump = this.Bump.bind(this);
    }

    player_list = [
        {
            name: "kevin",
            pos: "start",
            color: "orange",
            turn: 0
        },
        {
            name: "bob",
            pos: "start",
            color: "green",
            turn: 0
        },
        {
            name: "stuart",
            pos: "start",
            color: "blue",
            turn: 0
        }
    ]

    DiceRoll = () => {
        //get dice roll
        let _die1 = this.RNG(1,6);
        let _die2 = this.RNG(1,6);
        let total = _die1 + _die2;
        //player info
        let pos = this.player_list[this.state.active_player].pos;
        //tracks if the player moved
        let moved = false;

        //active player's turn increases
        // turn+=1;

        //if at start position
        if (pos === "start") {
            //if snake eyes
            if (_die1 === 1 && _die2 === 1) {
                //move to space 3
                this.player_list[this.state.active_player].pos = 3;
                moved = true;
            } else if (_die1 === 1 || _die2 === 1) { //either die is 1
                //move to space 1
                this.player_list[this.state.active_player].pos = 1;
                moved = true;
            } else if (_die1 === 6 && _die2 === 6) { //win from start by rolling 12
                this.player_list[this.state.active_player].pos = total;
                // this.setState({
                //     game_over: true
                // })
            }
        } else {
            //next and previous spaces
            let next = pos + 1;
            let prev = pos - 1;

            //rolling rules in order of importance
            if (_die1 === prev || _die2 === prev || total === prev) { //if prev is rolled, must go back to that space
                this.player_list[this.state.active_player].pos = prev;
                moved = true;
            } else if (_die1 === _die2) { //if doubles
                console.log('doubles')
                //snake eyes moves 3
                if (total === 2) {
                    console.log('snake eyes')
                    //if new pos is higher than 12, no  move
                    if (pos + 3 <= 12) {
                        this.player_list[this.state.active_player].pos += 3;
                        moved = true;
                    }
                }
                else if (pos > 7) { //after square 7, doubles moves 2 spaces
                    if (pos + 2 <= 12) { //if moving 2 does not put you past the board
                        this.player_list[this.state.active_player].pos += 2;
                        moved = true;
                    } else if (total === next) { //if your double is the next step, move to that step
                        //included because of bug in rules that prevents winning on space 11
                        //you need a 12, which is a double, and space is over 7; from above, nothing happens
                        this.player_list[this.state.active_player].pos += 1;
                        moved = true;
                    }
                }
                else if (_die1 > pos) { //if the total is ahead of player
                    console.log('move to die1')
                    //move to that spot
                    this.player_list[this.state.active_player].pos = _die1;
                    moved = true;
                } else { //total is current or behind, move 2 spaces
                    this.player_list[this.state.active_player].pos += 2;
                    moved = true;
                }
            }
            else if (_die1 === next || _die2 === next || total === next) { //if next is rolled, go to that space
                this.player_list[this.state.active_player].pos = next;
                moved = true;
            }
        }

        //bump back feature
        if (moved) { //if the player moved
            this.Bump(this.player_list[this.state.active_player]);
        }

        //get the next player
        //if the player moved, they go again; if not, next player's turn
        let newActivePlayer = (moved) ? this.state.active_player : (this.state.active_player + 1) % this.player_list.length;

        this.setState({
            //set dice roll
            die1: _die1,
            die2: _die2,
            //set new active player
            active_player: newActivePlayer,
            who_rolled: this.state.active_player
        })

        console.log(this.player_list);
    }

    Bump = (player) => {
        for (let i = 0; i < this.player_list.length; i++) { //for all players
            let other_player = this.player_list[i];
            if (player !== other_player) { //don't check a player against itself
                if (player.pos === other_player.pos &&
                    other_player.pos !== 1) { //active player's position equals another player's position, but not on first space
                    this.player_list[i].pos -= 1; //move other player back 1 space
                    this.Bump(this.player_list[i]) //check the bumped player's position for another bump
                }
            }
        }
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
                <div className="playback">
                    {this.state.who_rolled !== null ? <div className="who-rolled"
                                                           style={{color: this.player_list[this.state.who_rolled].color}}>
                                                         {this.player_list[this.state.who_rolled].name}
                                                      </div> 
                                                    : 
                                                      <div></div>}
                    <div className="dice">
                        <Die dotCnt={this.state.die1} />
                        <Die dotCnt={this.state.die2} />
                    </div>
                </div>
                
                <div className="game-menu">
                    <div className="active-player">turn: &nbsp; <span style={{color: this.player_list[this.state.active_player].color}}>
                                                             {this.player_list[this.state.active_player].name}
                                                         </span>
                    </div>
                    <Button role="roll" clickHandler={this.DiceRoll} bg={this.player_list[this.state.active_player].color}/>
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