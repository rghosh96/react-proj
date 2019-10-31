import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { tsConstructorType } from '@babel/types';


//function component!
function Square(props) {
    return (
        //onClick prop (LHS) in DOM button tells React to set up click event listener
        //when click button, calls the props.onClick function
        //props.onClick() comes from Board
        //Board passed onClick() to handClick(i) so that is ultimaely called
        <button className ="square" onClick={props.onClick}> 
          {props.value}
        </button>
    );
}
  
  class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),   //declare new var squares that is an array of 9 null squares
            whichPlayer: true,                  //boolean to be flipped to keep track of which player is up!
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) { //check if already a winner, stop executing function
          return;
        }
        squares[i] = this.state.whichPlayer ? '❤' : '✿';    //if 0, flower, if 1, heart!
        this.setState({
            squares: squares,
            whichPlayer: !this.state.whichPlayer,   //flip player boolean to take turns
        });
    }

    renderSquare(i) {
      return (  //pass down 2 properties from board->square: value and onClick
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)} />
      );
    }
  
    render() {
        //displays which plasgrwyer is next!
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        }
        else {
          status = 'Next player: ' + (this.state.whichPlayer ? '❤' : '✿');
        }

        return (
            <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
            </div>
        );
    }
  }
  
  class Game extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null) 
          }],
          whichPlayer: true,
        };
      }

      render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  