import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { deleteThisList, getAllLists, getOneList } from "../../store/lists";
import EditListForm from "../EditListForm";
import './style.css'

const IndividualList = ({ list }) => {
    const user = useSelector(state => state.session.user);
    const firstList = useSelector(state => state.lists.lists[0])
    const selectedList = useSelector(state => state.lists.selected_list)
    const [editOpen, setEditOpen] = useState(false)
    const dispatch = useDispatch()

    const openList = async () => {
        let previousSelectedList = document.getElementById(`list-container-${selectedList.id}`)

        const opened = await dispatch(getOneList(list.id))

        if (opened) {
            if (previousSelectedList) {
                previousSelectedList.className = 'list-container';
            }
            let currentSelectedList = document.getElementById(`list-container-${list.id}`)
            currentSelectedList.className = 'active-list';
        }
    }



    const openFirstList = () => {
        dispatch(getOneList(firstList.id))
    }

    const openPopup = () => {
        setEditOpen(!editOpen)
    }

    const sendDataToParent = (data) => {
        setEditOpen(data)
    }

    const deleteList = async () => {
        const deleted = await dispatch(deleteThisList(list.id))
        if (deleted) {
            dispatch(getAllLists())
            openFirstList()
        }
    }

    return (
        <div className="list-container" id={`list-container-${list.id}`} onClick={openList}>
            <div>
                <h3 className='list-name' id={`list-${list.name}`}>{list.name}</h3>
                <h4 className="list-username">{list.username}</h4>
            </div>
            <div className="list-options-div">
                {list.userId !== user.id && (
                    <button className="list-page-button">Play</button>
                )}
                {list.userId === user.id && (
                    <>
                        <div>
                            {!editOpen && (
                                <button className="list-page-button" onClick={openPopup}>Edit</button>
                            )}
                            {editOpen && (
                                <EditListForm list={list} editState={editOpen} sendDataToParent={sendDataToParent} />
                            )}
                        </div>
                        <button className="list-page-button" onClick={deleteList}>Delete</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default IndividualList;
