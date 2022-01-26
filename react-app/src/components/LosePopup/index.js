import React from "react";

const LosePopup = ({word}) => {
    const playAgain = () => {
        window.location.reload(true);
    }

    return (
        <>
        <div id='lose-container'>
            <div id='lose-inner-container'>
                <h2 id='sorry'>Sorry!</h2>
                <p id='lose-word'>The word was {word}.</p>
                <p id='points-gained'>+ 0 pts</p>
                <button onClick={playAgain} id='play-again-loss'>Play again?</button>
            </div>
        </div>
        </>
    )
}

export default LosePopup;
