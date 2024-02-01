import React, { useState, useEffect } from 'react';

function PlayerButton({color}) {
    const [light, setLight] = useState("");

    function lightUp(){
        setLight(`greenbg`);

        setTimeout(() => {
            setLight("");
        }, 1000)
    }

    return (  
        <div className={`button ${color} ${light}`} onClick={lightUp}></div>
    );
}

export default PlayerButton;