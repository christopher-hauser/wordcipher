import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllChallenges, getAllMyChallenges } from '../../store/challenges';
import NewChallengeForm from '../NewChallengeForm';
import SentChallenges from '../SentChallenges';
import ReceivedChallenges from '../ReceivedChallenges';
import './style.css'

function ChallengesPage() {
    const user = useSelector(state => state.session.user)
    const challenges = useSelector(state => state.challenges.challenges)
    const myChallenges = useSelector(state => state.challenges.myChallenges)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllChallenges(user.id))
        dispatch(getAllMyChallenges(user.id))
    }, [dispatch, user.id])

    return (
        <>
            <div id='challenges-page-container'>
                <div id='list-background-image-container'>
                    <div className='new-list-container'>
                        <h2 id='lists-title'>CHALLENGES</h2>
                        <h3 id='list-explain'>Send a challenge to a friend!</h3>
                        <NewChallengeForm />
                    </div>
                </div>
                <div className='lists-and-words'>
                    <div id='challenges-sent'>
                        <div id='top-of-challenges-sent'>
                            <h2>SENT</h2>
                        </div>
                        <div id='bottom-challenges-sent'>
                            {myChallenges.length > 0 && (
                                <>
                                    {myChallenges?.map(challenge => (
                                        <SentChallenges challenge={challenge} />
                                    ))}
                                </>
                            )}
                            {myChallenges.length === 0 && (
                                <p>Try sending your friend a challenge!</p>
                            )}
                        </div>
                    </div>

                    <div id='challenges-received'>
                        <div id='top-of-challenges-received'>
                            <h2>RECEIVED</h2>
                        </div>
                        <div id='challenges-received-list'>
                            {challenges.length > 0 && (
                                <>
                                    {challenges?.map(challenge => (
                                        <ReceivedChallenges challenge={challenge} />
                                    ))}
                                </>
                            )}
                            {challenges.length === 0 && (
                                <p id='no-challenges'>No challenges at this time.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ChallengesPage
