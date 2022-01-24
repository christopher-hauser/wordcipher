import React, {  useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { editThisChallenge, getAllMyChallenges, sendNewChallenge } from "../../store/challenges";

const EditChallengeForm = ({ challenge, editState, sendDataToParent }) => {
    const [errors, setErrors] = useState([])
    const [word, setWord] = useState('')
    const [editOpen, setEditOpen] = useState(editState);
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const submit = async e => {
        e.preventDefault();

        const editedChallenge = {
            'id': challenge.id,
            'challengerId': user.id,
            'recipientId': challenge.recipientId,
            'word': word,
        }

        const validate = () => {
            let errors = [];
            if (word.length !== 5) errors.push('Word must be exactly 5 characters.')
            return errors;
        }

        const these_errors = validate();

        if (these_errors.length > 0) {
            setErrors(these_errors);
            return;
        }

        let submitted = await dispatch(editThisChallenge(editedChallenge))
        if (Array.isArray(submitted)) {
            setErrors(submitted)
        }
        else {
            dispatch(getAllMyChallenges(user.id))
            setWord('')
            setEditOpen(!editOpen)
            sendDataToParent(!editOpen)
        }
    }


    return (
        <div>
            <form className='edit-challenge-word' onSubmit={submit}>
                <div className="errors">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                        className="edit-challenge-input"
                        name='word'
                        placeholder="Update..."
                        value={word}
                        onChange={e => setWord(e.target.value)}
                    />
                </div>
            </form>
        </div>
    )
}

export default EditChallengeForm
