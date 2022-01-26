import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { addNewWord } from "../../store/lists";
import { getOneList } from "../../store/lists";

const AddWordForm = ({ list }) => {
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);
    const [word, setWord] = useState('');
    const dispatch = useDispatch();

    const validate = () => {
        const errors = [];
        if (word.length !== 5) {
            errors.push('Word must be exactly 5 characters.')
        }
        return errors;
    }

    const submit = async e => {
        e.preventDefault();

        let errors = validate();
        if (errors.length > 0) return setErrors(errors);

        const newWord = {
            'userId': user.id,
            'listId': list.id,
            word: word.toUpperCase()
        }

        await dispatch(addNewWord(newWord))
        dispatch(getOneList(list.id))
        setWord('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div className="error">
                    {errors.map((error, ind) => (
                        <div className="error-item" key={ind}>{error}</div>
                    ))}
                </div>
                <div id='add-word-container'>
                    <div>
                        <input
                            id='add-word-input'
                            name='word'
                            placeholder="Type your word..."
                            value={word}
                            onChange={e => setWord(e.target.value)}
                        />
                    </div>
                    <button className='list-page-button' type='submit'>Add!</button>

                </div>
            </form>
        </div>
    )

}

export default AddWordForm;
