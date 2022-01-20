import React from 'react';

function SentChallenges({ challenge }) {

    return (
        <>
        <h3>{challenge.challengeeName}</h3>
        <p>{challenge.word}</p>
        <button>Edit Word</button>
        <p>{challenge.status}</p>
        <button>Delete Challenge</button>
        </>
    )
}

export default SentChallenges;
