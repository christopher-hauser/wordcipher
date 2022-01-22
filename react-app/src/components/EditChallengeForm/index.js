import React, {  useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { editThisChallenge, getAllMyChallenges, sendNewChallenge } from "../../store/challenges";

const EditChallengeForm = ({ challenge }) => {
    const [errors, setErrors] = useState([])
    const [word, setWord] = useState('')
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

        let submitted = await dispatch(editThisChallenge(editedChallenge))
        if (Array.isArray(submitted)) {
            setErrors(submitted)
        }
        else {
            dispatch(getAllMyChallenges(user.id))
            setWord('')
        }
    }


    return (
        <div>
            <form onSubmit={submit}>
                <div className="errors">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label htmlFor='word'>Challenge Word</label>
                    <input
                        name='word'
                        placeholder="Enter your word..."
                        value={word}
                        onChange={e => setWord(e.target.value)}
                    />
                </div>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default EditChallengeForm
