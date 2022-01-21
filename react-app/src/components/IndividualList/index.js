import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { deleteThisList, getAllLists, getOneList } from "../../store/lists";
import EditListForm from "../EditListForm";
import './style.css'

const IndividualList = ({ list }) => {
    const user = useSelector(state => state.session.user);
    const firstList = useSelector(state => state.lists.lists[0])
    const [editOpen, setEditOpen] = useState(false)
    const dispatch = useDispatch()

    const openList = () => {
        dispatch(getOneList(list.id))
    }

    const openFirstList = () => {
        dispatch(getOneList(firstList.id))
    }

    const openPopup = () => {
        setEditOpen(!editOpen)
    }

    const deleteList = async () => {
        const deleted = await dispatch(deleteThisList(list.id))
        if (deleted) {
            dispatch(getAllLists())
            openFirstList()
        }
    }

    return (
        <div className="list-container" onClick={openList}>
            <h3 id={`list-${list.name}`}>{list.name}</h3>
            <h4>{list.username}</h4>
            {list.userId !== user.id && (
                <button>Play</button>
            )}
            {list.userId === user.id && (
                <>
                {}
                <button onClick={openPopup}>Edit List Name</button>
                {editOpen && (
                    <EditListForm list={list}/>
                )}
                <button onClick={deleteList}>Delete List</button>
                </>
            )}
        </div>
    )
}

export default IndividualList;
