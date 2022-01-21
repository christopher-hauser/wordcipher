import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { addNewWord } from "../../store/lists";
import { getOneList } from "../../store/lists";

const AddWordForm = ({list}) => {
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);
    const [word, setWord] = useState('');
    const dispatch = useDispatch();

    const submit = async e => {
        e.preventDefault();

        const newWord = {
            'userId': user.id,
            'listId': list.id,
            word
        }

        let submitted = await dispatch(addNewWord(newWord))
        if (Array.isArray(submitted)) {
            setErrors(submitted)
        } else {
            dispatch(getOneList(list.id))
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
                    <input
                        name='word'
                        placeholder="Add a word!"
                        value={word}
                        onChange={e => setWord(e.target.value)}
                    />
                </div>
                <button type='submit'>Add word!</button>
            </form>
        </div>
    )

}

export default AddWordForm;
