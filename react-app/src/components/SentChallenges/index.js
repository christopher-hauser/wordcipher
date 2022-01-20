import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteThisChallenge } from '../../store/challenges';
import EditChallengeForm from '../EditChallengeForm';


function SentChallenges({ challenge }) {
    const dispatch = useDispatch()
    const history = useHistory();
    const [editOpen, setEditOpen] = useState(false);

    const handleDelete = () => {
        dispatch(deleteThisChallenge(challenge.id))
        window.location.reload(true)
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
