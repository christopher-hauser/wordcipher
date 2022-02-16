import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import challenges, { deleteThisChallenge, getAllMyChallenges } from '../../store/challenges';
import EditChallengeForm from '../EditChallengeForm';


function SentChallenges({ challenge }) {
    const dispatch = useDispatch()
    const [editOpen, setEditOpen] = useState(false);

    const handleDelete = async () => {
        await dispatch(deleteThisChallenge(challenge.id))
        dispatch(getAllMyChallenges(challenge.challengerId))

    }

    const sendDataToParent = (data) => {
        setEditOpen(data)
    }

    const openPopup = () => {
        setEditOpen(!editOpen)
    }

    return (
        <>
            <div id={`challenge-sent-${challenge.id}`} className='challenge-sent-container'>
                <h3>{challenge.challengeeName}</h3>
                <div className='challenge-word-and-status'>
                    <p>{challenge.word}</p>
                    <p>{challenge.status}</p>
                </div>
                <div className='sent-challenge-options'>
                    {challenge.status === 'Incomplete' && (
                        <>
                            {!editOpen && (
                                <button className='sent-button' onClick={openPopup}>Edit</button>
                            )}
                            {editOpen && (
                                <EditChallengeForm challenge={challenge} editState={editOpen} sendDataToParent={sendDataToParent} />
                            )}
                            <button className='sent-button' onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default SentChallenges;
