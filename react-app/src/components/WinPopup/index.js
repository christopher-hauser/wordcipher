import React from "react";
import './style.css'

const WinPopup = ({ points, attempts }) => {
    const playAgain = () => {
        window.location.reload(true);
    }

    return (
        <>
        <div id='win-container'>
            <div id='win-inner-container'>
                <h2 id='congratulations'>Congratulations!</h2>
                {attempts == 1 && (
                <p id='win-attempts'>You guessed the word in {attempts} attempt.</p>
                )}
                {attempts > 1 && (
                    <p id='win-attempts'>You guessed the word in {attempts} attempts.</p>
                )}
                <p id='points-gained'>+ {points} pts</p>
                <button onClick={playAgain} id='play-again'>Play again?</button>
            </div>
        </div>
        </>
    )
}

export default WinPopup;
