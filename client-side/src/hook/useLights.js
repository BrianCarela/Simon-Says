import React, { useState, useEffect } from 'react';

// the shiny stuff. I should use this to glow each light + make sound
// maybe not - CREATE EVERYTHING ON App.js AND THEN REFACTOR LATER
function useLights() {
    const [lightOn, setLightOn] = useState(false);
    const [currentColor, setCurrentColor] = useState("");

    useEffect(() => {
        setLightOn(true)
    }, [currentColor])

    return [lightOn, currentColor, setCurrentColor];
}

export default useLights;