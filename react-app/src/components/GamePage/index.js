import React from "react";
import GameRandom from "../GameRandom";
import './style.css'

function GamePage() {
    return (
        <>
            <div id='game-page-container'>
                <div id='game-container'>
                    <GameRandom />
                </div>
                <div id='instructions-container'>
                    <div id='inner-instructions-container'>
                        <h1 id='welcome-wordcipher'>Welcome to WORDCIPHER!</h1>
                        <h2 id='word-guessing'>A word-guessing game.</h2>
                        <p id='how-to'>Here's how to play: </p>
                        <p className="instructions">You are tasked with figuring out the word provided to you. The word will always be
                            five letters long and belong in the dictionary. You will not be given a proper noun (i.e. names,
                            places, etc.)
                        </p>
                        <p className="instructions">You have 6 guesses to get the word correct. After you submit each guess, the letters in your answer
                            will light up a certain color to indicate your accuracy. If a letter turns yellow, it is in the word,
                            but not in the spot you had it. If a letter turns green, it is in the word and in the right spot! If a letter
                            turns gray, it isn't in the word at all.
                        </p>
                        <p className="instructions">Good luck!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GamePage;
