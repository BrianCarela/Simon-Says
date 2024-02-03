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

  // TRACK THE GLOWING SEQUENCE
  const [currentGlowIndex, setCurrentGlowIndex] = useState(-1);
  const [glowAllActive, setGlowAllActive] = useState(false);

  // ORDERED PATTERNS
  const [computerPattern, setComputerPattern] = useState([]);
  const [playerPattern, setPlayerPattern] = useState([]);

  // for Computer pattern making
  function randomColor(){
    let randomIndex = Math.floor(Math.random()*4)
    let colors = ["red", "blue", "green", "yellow"]

    return colors[randomIndex]
  }

  function increaseComputerPattern(){
    let newColor = randomColor();

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
  }

  function computerTakesTurn() {
    increaseComputerPattern();
    setTimeout(() => glowAll(), 500); // Slight delay before starting
    // setTimeout(() => beginGlowSequence(), 1750);
  }

  function beginGlowSequence(){
    setCurrentGlowIndex(0)
  }
  
  function glowAll() {
    setGlowAllActive(true);
    setTimeout(() => {
      setGlowAllActive(false);
    }, 1000); // Match the glow duration in CompButton
  }  

  // HANDLE THE GLOW PATTERN
  useEffect(() => {
    if (!glowAllActive && currentGlowIndex >= 0 && currentGlowIndex < computerPattern.length) {
      // Set a timeout to advance the glow sequence
      const timer = setTimeout(() => {
        const nextIndex = currentGlowIndex + 1;
        // if the next index isn't the end of the pattern...
        if (nextIndex < computerPattern.length) {
          // ...move forward
          setCurrentGlowIndex(nextIndex);
        } else {
          // Sequence complete, prepare for the next step
          setTimeout(increaseComputerPattern, 500); // Add a new color after a delay
          setCurrentGlowIndex(-1); // Reset the sequence
        }
      }, 1000);
  
      return () => clearTimeout(timer); // Cleanup
    }
  }, [currentGlowIndex]);
  

  // DECIDE WHO TAKES THEIR TURN
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
