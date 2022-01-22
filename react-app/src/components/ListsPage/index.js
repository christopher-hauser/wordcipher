import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllLists } from '../../store/lists';
import IndividualList from '../IndividualList';
import NewListForm from '../NewListForm';
import ListOfWords from '../ListOfWords';
import './style.css'

function ListsPage() {
    const lists = useSelector(state => state.lists.lists)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllLists())
    }, [dispatch])

    return (
        <div className='list-page-container'>
            <div className='new-list-container'>
                <h2 id='lists-title'>LISTS</h2>
                <h3 id='list-explain'>Create a new list of words for other users to play from!</h3>
                <NewListForm />
            </div>
            <div>
                <div className='lists-and-words'>
                    <div id='player-lists'>
                        <h2 id='browse-list-title'>BROWSE PLAYER LISTS</h2>
                        <h3 id='select-list-text'>Select from a list below.</h3>
                        {lists.length > 0 && (
                            <>
                                {lists.map(list => (
                                    <IndividualList list={list} />
                                ))}
                            </>
                        )}

                    </div>
                    <div id='player-list-words'>
                        <ListOfWords />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListsPage
