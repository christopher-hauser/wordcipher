import React from "react";
import GameRandom from "../GameRandom";
import './style.css'

function GamePage() {
    return (
        <>
            {/* <div id='game-page-container'>
                <h2 id='wordcipher-title'>Welcome to Wordcipher!</h2>
                <p id='coming-soon'>Game coming soon. :)</p>
            </div> */}
            <div>
                <GameRandom />
            </div>
        </>
    )
}

export default GamePage;
