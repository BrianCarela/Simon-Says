import React, { useState, useEffect } from 'react';

function CompButton({ 
    color, 
    shouldGlowOnce,
    glowAll 
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

    // only 1 instance gets this at a time
    useEffect(() => {
        // If shouldGlow is true, turn on the glow
        if (shouldGlowOnce) {
            glowThisLight()
        }
    }, [shouldGlowOnce]);

    // ALL OF THE LIGHTS
    useEffect(() => {
        if(glowAll){
            glowThisLight()
        }
    }, [glowAll])

    // Combine the base class with the dynamic glowState
    const classes = `button ${color} ${glowState}`;
  
    return <div className={classes}></div>;
}
  
export default CompButton;
