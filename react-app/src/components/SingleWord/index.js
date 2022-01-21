import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteOneWord, getOneList } from '../../store/lists';

const SingleWord = ({ word }) => {
    const dispatch = useDispatch();


    const onDelete = async () => {
        const deleted =  await dispatch(deleteOneWord(word))
        if (deleted) {
            dispatch(getOneList(word.listId))
        }
    }

    return (
        <>
            <p>{word.word}</p>
            <button onClick={onDelete}>Remove</button>
        </>
    )
}


export default SingleWord;
