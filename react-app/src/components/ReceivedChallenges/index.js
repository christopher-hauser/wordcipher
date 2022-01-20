import React from 'react';

function ReceivedChallenges({ challenge }) {

    return (
        <>
        <h3>{challenge.challengeeName}</h3>
        <p>{challenge.status}</p>
        <button>Play</button>
        </>
    )
}

export default ReceivedChallenges;
