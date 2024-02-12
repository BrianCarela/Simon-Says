import React, { useState, useEffect } from 'react';

function PlayerButton({
    color,
    onPlayerClick
}) {
    // Use state to manage the dynamic class for glowing
    const [glowState, setGlowState] = useState('');

    // 1 second glow
    function glowThisLight(){
        setGlowState(`${color}bg`);
        // Set a timeout to remove the glow after 1 second
        const timer = setTimeout(() => {
            setGlowState('');
        }, 1000);
        // Cleanup the timeout if the component unmounts or if shouldGlow changes
        return () => clearTimeout(timer);
    }

    // Combine the glow effect with the playerPattern
    function tiedTogether(){
        // onPlayerClick(color)
        glowThisLight()
    }
    
    // Combine the base class with the dynamic glowState
    const classes = `button ${color} ${glowState}`

    return (  
        <div className={classes} onClick={tiedTogether}></div>
    );
}

export default PlayerButton;
