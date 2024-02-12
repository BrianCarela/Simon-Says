import './App.css';
import PlayerButton from './PlayerButton';
import React, { useState, useEffect } from 'react';
import CompButton from './CompButton';

function App() {

  // TURNS
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  // TRACK THE GLOWING SEQUENCE
  const [currentGlowIndex, setCurrentGlowIndex] = useState(-1);
  const [glowAllActive, setGlowAllActive] = useState(false);

  // ORDERED PATTERNS
  const [computerPattern, setComputerPattern] = useState([randomColor()]);
  const [playerPattern, setPlayerPattern] = useState([]);

  // Flip who's turn it is
  function switchTurns(){
    setIsPlayerTurn((prevState) => {
      return !prevState;
    })

    setIsComputerTurn((prevState) => {
      return !prevState;
    })
  }

  // DECIDE WHO TAKES THEIR TURN
  useEffect(() => {
    if(isComputerTurn){
      computerTakesTurn()
    } else if(isPlayerTurn){
      // do player logic later
      // check the comp status during player's turn
      console.log(computerPattern)
    }
  }, [isPlayerTurn])

  function computerTakesTurn() {
    increaseComputerPattern();
    glowAll()
  }

  function increaseComputerPattern() {
    let newColor = randomColor();
    const lastColor = computerPattern[computerPattern.length - 1];
  
    // Ensure newColor is not the same as the last color in the pattern
    while (newColor === lastColor) {
      newColor = randomColor();
    }
  
    setComputerPattern(prevState => [...prevState, newColor]);
  }  

  // for Computer pattern making
  function randomColor(){
    let randomIndex = Math.floor(Math.random()*4)
    let colors = ["red", "blue", "green", "yellow"]

    return colors[randomIndex]
  }

  function glowAll() {
    setGlowAllActive(true);
    setTimeout(() => {
      setGlowAllActive(false);
      beginGlowSequence()
    }, 1000); // Match the glow duration in CompButton
  } 

  function beginGlowSequence(){
    for(let i = 0; i < computerPattern.length; i++){
      setTimeout(() => {
        setCurrentGlowIndex(i)
      }, 1500 + (1000 * i))
    }
    setTimeout(() => {
      setCurrentGlowIndex(-1);
      switchTurns() // Player's turn
    }, 1500 + (1000 * computerPattern.length));
  }

  function handlePlayerClick(color) {
    // Update playerPattern
    setPlayerPattern([...playerPattern, color]);
  }

  // Always check if the player pattern is correct
  useEffect(() => {
    console.log({
      playerPattern,
      computerPattern
    })

    let currentColor = playerPattern.length - 1

    // Only do it from first player click and onward
    if(playerPattern.length > 0){
      // If this current click matches
      if (playerPattern[currentColor] === computerPattern[currentColor]) {
        alert('right so far!')

        // If the player reaches the end of the patter. computerPattern is always 1 step ahead 🤖
        if (playerPattern.length + 1 === computerPattern.length) {
          
          alert("Correct sequence! Now it's the computer's turn.");
  
          setPlayerPattern([])
  
          switchTurns(); 
        }
      // Incorrect input
      } else {
        alert("Incorrect! Try again.");
        // Handle end of game or allow retries
        setPlayerPattern([])
      }
    }
  }, [playerPattern])
  
  return (
    <div className="flexer">
      {isPlayerTurn ?
       <>
        <PlayerButton color={"red"} onPlayerClick={handlePlayerClick}/>
        <PlayerButton color={"blue"} onPlayerClick={handlePlayerClick}/>
          <div className="scoreBoard">
            <span className="score">10</span>
          </div>
        <PlayerButton color={"green"} onPlayerClick={handlePlayerClick}/>
        <PlayerButton color={"yellow"} onPlayerClick={handlePlayerClick}/>
       </>
       :
       <>
        <CompButton 
          color="red" 
          shouldGlowOnce={computerPattern[currentGlowIndex] === "red"}
          glowAll={glowAllActive} 
        />
        <CompButton 
          color="blue" 
          shouldGlowOnce={computerPattern[currentGlowIndex] === "blue"}
          glowAll={glowAllActive} 
        />
          <div className="scoreBoard">
            <span className="score">0</span>
          </div>
        <CompButton 
          color="green" 
          shouldGlowOnce={computerPattern[currentGlowIndex] === "green"}
          glowAll={glowAllActive} 
        />
        <CompButton 
          color="yellow" 
          shouldGlowOnce={computerPattern[currentGlowIndex] === "yellow"}
          glowAll={glowAllActive} 
        />
       </>
       }
       <button onClick={switchTurns}>switch</button>
    </div>
  );
}

export default App;
