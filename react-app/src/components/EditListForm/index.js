import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { editThisList, getAllLists } from "../../store/lists";

const EditListForm = ({ list }) => {
    const user = useSelector(state => state.session.user)
    const [editOpen, setEditOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const submit = async e => {
        e.preventDefault();

        const editedList = {
            'id': list.id,
            'userId': list.userId,
            name
        }

        let submitted = await dispatch(editThisList(editedList))
        if (Array.isArray(submitted)) {
            setErrors(submitted)
        }
        else {
            dispatch(getAllLists())
            setName('');
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
                        placeholder="Update list name..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <button type='submit'>Update</button>
            </form>
        </div>
    )

}

export default EditListForm;
