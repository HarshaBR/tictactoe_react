import React from 'react';
import { useState } from "react";

//Function specifying the Square component (board tile)
function Boardtile({value, squareClick}){
  return <button className="board-tile" onClick={squareClick}>{value}</button>
}

function ResetButton({onResetClick}){
  return <button className="reset-btn" onClick={onResetClick}>Reset</button>
}

//Function to check whether a win condition has been met on the board
function checkWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
  ]

  for(let i=0;i<lines.length;i++){
    const[a,b,c]=lines[i];
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
      return squares[a]
    }
  }
  return null;
}

// MAIN Function, that sets the Board and tracks game state
export default function Board() 
{
  
  const[xIsNext, setXIsNext] = useState(true);
  const[squares, setSquares] = useState(Array(9).fill(null));
  let status;
  const winner = checkWinner(squares);

  //Function to handle reset button click
  function resetGame(squares){
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    status = ""
  }


  // Function to handle the click event 
  function handleClick(i){
    const nextSquare = squares.slice();
  
    if (squares[i]||winner){
      return;
    }

    if (xIsNext===true){
      nextSquare[i] = "X";}
    else {
      nextSquare[i] = "O"
    }

    setSquares(nextSquare)
    setXIsNext(!xIsNext)
  }

  if (winner) {
    status = "The Winner is "+ winner;
  }
  else if (true) {status = "It is "+(xIsNext ? "X":"O")+"'s turn"}
  
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Boardtile value={squares[0]} squareClick={()=>handleClick(0)}/>
        <Boardtile value={squares[1]} squareClick={()=>handleClick(1)}/>
        <Boardtile value={squares[2]} squareClick={()=>handleClick(2)}/>
      </div>
      <div className="board-row">
        <Boardtile value={squares[3]} squareClick={()=>handleClick(3)}/>
        <Boardtile value={squares[4]} squareClick={()=>handleClick(4)}/>
        <Boardtile value={squares[5]} squareClick={()=>handleClick(5)}/>
      </div>
      <div className="board-row">
        <Boardtile value={squares[6]} squareClick={()=>handleClick(6)}/>
        <Boardtile value={squares[7]} squareClick={()=>handleClick(7)}/>
        <Boardtile value={squares[8]} squareClick={()=>handleClick(8)}/>
      </div>
      <div>
        <ResetButton onResetClick={()=>resetGame(squares)}/>  
      </div>
    </div> )
}