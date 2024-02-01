import React, { useState, useEffect } from 'react';

// on component load, these buttons should "glow"

function CompButton({
    color,
    latest
}){

    const [styles, setStyles] = useState(`button ${color}`)

    function glowAll(){
        setStyles(`button ${color} ${color}bg`)

        setTimeout(() => {
            setStyles(`button ${color}`)
        }, 1500)
    }

    useEffect(() => {
        // //////// GAME START ////////////
        glowAll()
        // //////// GAME START ////////////
    }, [])

    useEffect(() => {
        // //////// ONE TURN  ////////////
        // proof that i can do this, but...
        if(color === latest){
            setTimeout(() => {
                setStyles(`button ${color} ${color}bg`)
            }, 3000)

            setTimeout(() => {
                setStyles(`button ${color}`)
            }, 4500)

            console.log("latest color:")
            console.log(latest)
        }
        // //////// ONE TURN  ////////////
    }, [latest])

    return <div className={styles}></div>
}

export default CompButton;