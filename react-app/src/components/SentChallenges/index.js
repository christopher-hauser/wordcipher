import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteThisChallenge, getAllMyChallenges } from '../../store/challenges';
import EditChallengeForm from '../EditChallengeForm';


function SentChallenges({ challenge }) {
    const dispatch = useDispatch()
    const [editOpen, setEditOpen] = useState(false);

    const handleDelete = async () => {
        await dispatch(deleteThisChallenge(challenge.id))
        dispatch(getAllMyChallenges(challenge.challengerId))

    }

    const openPopup = () => {
        setEditOpen(!editOpen)
    }

    return (
        <>
        <h3>{challenge.challengeeName}</h3>
        <p>{challenge.word}</p>
        {!editOpen && (
            <button onClick={openPopup}>Edit Word</button>
        )}
        {editOpen && (
            <EditChallengeForm challenge={challenge} />
        )}
        <p>{challenge.status}</p>
        <button onClick={handleDelete}>Delete Challenge</button>
        </>
    )
}

export default SentChallenges;
