import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { addNewList, getAllLists } from "../../store/lists";
import './style.css'

const NewListForm = () => {
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const submit = async e => {
        e.preventDefault();

        const newList = {
            'userId': user.id,
            name: name.toUpperCase()
        }

        let submitted = await dispatch(addNewList(newList))
        if (Array.isArray(submitted)) {
            setErrors(submitted)
        }
        else {
            dispatch(getAllLists())
            setName('')
        }
    }

    return (
        <div>
            <form id='create-list-form' onSubmit={submit}>
                <div className="errors-div">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                        id='new-list-input'
                        name='name'
                        placeholder="Enter list name..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <button id='create-list-button' type='submit'>Add List</button>
            </form>
        </div>
    )

}

export default NewListForm;
