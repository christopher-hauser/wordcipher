import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { addNewList } from "../../store/lists";

const NewListForm = () => {
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const submit = async e => {
        e.preventDefault();

        const newList = {
            'userId': user.id,
            name
        }

        let submitted = await dispatch (addNewList(newList))
        if (Array.isArray(submitted)) {
            setErrors(submitted)
        }
        else {
            window.location.reload(true)
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
                    <label htmlFor='name'>List Name</label>
                    <input
                        name='name'
                        placeholder="Enter list name..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <button type='submit'>Create List</button>
            </form>
        </div>
    )

}

export default NewListForm;
