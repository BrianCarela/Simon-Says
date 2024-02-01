import './App.css';
import PlayerButton from './PlayerButton';
import React, { useState, useEffect } from 'react';
import CompButton from './CompButton';

/*
  RECAP
*/
// refactoring all the things!!!

function App() {

  // TURNS
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  // WHAT IS MY NEXT STEP


  // ORDERED PATTERNS
  const [computerPattern, setComputerPattern] = useState([]);
  const [playerPattern, setPlayerPattern] = useState([]);

  const [latestColor, setLatestColor] = useState("")

  // for Computer pattern making
  function randomColor(){
    let randomIndex = Math.floor(Math.random()*4)
    let colors = ["red", "blue", "green", "yellow"]

    return colors[randomIndex]
  }

  function increaseComputerPattern(){
    let newColor = randomColor();

    setLatestColor(newColor)

    setComputerPattern((prevState) => {
      return [...prevState, newColor]
    })
  }

  // Flip who's turn it is
  function switchTurns(){
    setIsPlayerTurn((prevState) => {
      return !prevState;
    })

    setIsComputerTurn((prevState) => {
      return !prevState;
    })

    // CONSOLLLLLLLLE
    let metaData = {
      isPlayerTurn,
      computerPattern,
    }

    // CHECK THE CONSOLE
    console.log("===================")
    console.log("game state last turn (async):")
    console.log(metaData)
  }

  function computerTakesTurn(){
    setTimeout(() => {
      increaseComputerPattern()
    }, 1000)
  }

  useEffect(() => {
    if(isComputerTurn){
      computerTakesTurn()
    } else if(isPlayerTurn){
      // do player logic later
    }
  }, [isPlayerTurn])

  return (
    <div className="flexer">
      {isPlayerTurn ?
       <>
        <PlayerButton color={"red"} />
        <PlayerButton color={"blue"} />
          <div className="scoreBoard">
            <span className="score">10</span>
          </div>
        <PlayerButton color={"green"} />
        <PlayerButton color={"yellow"} />
       </>
       :
       <>
        <CompButton color={"red"} latest={latestColor} />
        <CompButton color={"blue"} latest={latestColor} />
          <div className="scoreBoard">
            <span className="score">0</span>
          </div>
        <CompButton color={"green"} latest={latestColor} />
        <CompButton color={"yellow"} latest={latestColor} />
       </>
       }
       <button onClick={switchTurns}>switch</button>
    </div>
  );
}

export default App;