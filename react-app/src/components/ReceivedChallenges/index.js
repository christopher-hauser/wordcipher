import React from 'react';
import { useHistory } from "react-router-dom";

function ReceivedChallenges({ challenge }) {
    const history = useHistory();

    const playChallenge = () => {
        history.push({
            pathname: '/',
            state: {
                word: challenge.word,
                challengerId: challenge.challengerId
             }
        })
    }

    return (
        <>
            <div id={`challenge-${challenge.id}`} className='received-challenge-container'>
                <h3 className='challenger-name'>{challenge.challengerName}</h3>
                <div className='status-play'>
                    <p className='status-text'>{challenge.status}</p>
                    {challenge.status === "Incomplete" && (
                        <button onClick={playChallenge} className='received-play-button'>Play</button>
                    )}
                </div>
            </div>
        </>
    )
}

export default ReceivedChallenges;
