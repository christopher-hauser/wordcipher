import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllLists } from '../../store/lists';
import IndividualList from '../IndividualList';
import NewListForm from '../NewListForm';

function ListsPage() {
    const user = useSelector(state => state.session.user)
    const lists = useSelector(state => state.lists.lists)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllLists())
    }, [dispatch])

    return (
        <>
        <div>
            <h2>Browse Player Lists</h2>
            {lists.length > 0 && (
                <>
                {lists.map(list => (
                    <IndividualList list={list}/>
                ))}
                </>
            )}
        </div>

        <div>
            <h2>Create a new list</h2>
            <NewListForm />
        </div>

        </>
    )
}

export default ListsPage
