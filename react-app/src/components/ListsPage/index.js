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
            <div id='list-background-image-container'>
                <div className='new-list-container'>
                    <h2 id='lists-title'>LISTS</h2>
                    <h3 id='list-explain'>Create a new list of words for other users to play from!</h3>
                    <NewListForm />
                </div>
            </div>
            <div>
                <div className='lists-and-words'>
                    <div id='lists-and-instructions'>
                        <div className='top-of-player-lists'>
                            <h2 id='browse-list-title'>BROWSE PLAYER LISTS</h2>
                            <h3 id='select-list-text'>Select from a list below.</h3>
                        </div>
                        <div id='player-lists'>
                            {lists.length > 0 && (
                                <>
                                    {lists.map(list => (
                                        <IndividualList list={list} />
                                    ))}
                                </>
                            )}

                        </div>
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
