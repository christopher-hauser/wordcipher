import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { editThisList, getAllLists } from "../../store/lists";

const EditListForm = ({ list, editState, sendDataToParent }) => {
    const user = useSelector(state => state.session.user)
    const [editOpen, setEditOpen] = useState(editState);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const submit = async e => {
        e.preventDefault();

        const editedList = {
            'id': list.id,
            'userId': list.userId,
            name: name.toUpperCase()
        }

        let submitted = await dispatch(editThisList(editedList))
        if (Array.isArray(submitted)) {
            setErrors(submitted)
        }
        else {
            dispatch(getAllLists())
            setName('');
            setEditOpen(!editOpen)
            sendDataToParent(!editOpen)
        }
    }

    return (
        <>
            {editOpen && (
                <div>
                    <form onSubmit={submit}>
                        <div className="errors">
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <div>
                            <input
                                className="edit-list-input"
                                name='name'
                                placeholder="Update list name..."
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            )}
        </>
    )

}

export default EditListForm;
