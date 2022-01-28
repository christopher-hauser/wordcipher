import React from "react";
import { useHistory } from "react-router-dom";

const LosePopup = ({word}) => {
    const history = useHistory();
    const playAgain = () => {
        history.push({
            pathname: '/',
            state: {}
        })
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
