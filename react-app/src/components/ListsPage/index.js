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
                <h2>Create a new list</h2>
                <NewListForm />
            </div>
            <div>
                <div className='lists-and-words'>
                    <div id='player-lists'>
                        <h2>Browse Player Lists</h2>
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
