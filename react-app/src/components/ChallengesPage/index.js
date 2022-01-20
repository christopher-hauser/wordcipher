import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllChallenges, getAllMyChallenges } from '../../store/challenges';
import NewChallengeForm from '../NewChallengeForm';
import SentChallenges from '../SentChallenges';
import ReceivedChallenges from '../ReceivedChallenges';

function ChallengesPage() {
    const user = useSelector(state => state.session.user)
    const challenges = useSelector(state => state.challenges.challenges)
    const myChallenges = useSelector(state => state.challenges.myChallenges)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllChallenges(user.id))
        dispatch(getAllMyChallenges(user.id))
    }, [dispatch])

    return (
        <>
        <h2>Send a challenge!</h2>
        <NewChallengeForm />

        <div>
        <h2>Challenges you've sent:</h2>
        {myChallenges.length > 0 && (
            <>
            {myChallenges?.map(challenge => (
                <SentChallenges challenge={challenge}/>
                ))}
            </>
        )}
        {myChallenges.length === 0 && (
            <p>Try sending your friend a challenge!</p>
        )}
        </div>

        <div>
        {challenges.length > 0 && (
        <>
        <h2>Challenges you've received:</h2>
        {challenges?.map(challenge => (
            <ReceivedChallenges challenge={challenge}/>
        ))}
        </>
        )}
        {challenges.length === 0 && (
            <p>No challenges at this time.</p>
        )}
        </div>

        </>
    )
}

export default ChallengesPage
