import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteOneWord, getOneList } from '../../store/lists';

const SingleWord = ({ word }) => {
    const dispatch = useDispatch();


    const onDelete = async () => {
        const deleted = await dispatch(deleteOneWord(word))
        if (deleted) {
            dispatch(getOneList(word.listId))
        }
    }

    return (
        <>
            <div className='word-container'>
                <p>{word.word}</p>
                <button className='remove-word-button' onClick={onDelete}>Remove</button>
            </div>
        </>
    )
}


export default SingleWord;
