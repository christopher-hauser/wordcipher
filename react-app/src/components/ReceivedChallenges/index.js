import React from 'react';

function ReceivedChallenges({ challenge }) {

    return (
        <>
            <div id={`challenge-${challenge.id}`} className='received-challenge-container'>
                <h3 className='challenger-name'>{challenge.challengerName}</h3>
                <div className='status-play'>
                    <p className='status-text'>{challenge.status}</p>
                    <button className='received-play-button'>Play</button>
                </div>
            </div>
        </>
    )
}

export default ReceivedChallenges;
