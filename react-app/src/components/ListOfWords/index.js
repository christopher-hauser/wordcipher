import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddWordForm from '../AddWordForm';
import { deleteOneWord } from '../../store/lists';
import SingleWord from '../SingleWord';

const ListOfWords = () => {
    const user = useSelector(state => state.session.user)
    const selectedList = useSelector(state => state.lists.selected_list)

    return (
        <>
            <h2>Words</h2>
            {user.id === selectedList.userId && Object.keys(selectedList).length > 0 && (
                <>
                    <AddWordForm list={selectedList} />
                    {selectedList.words.map(word => (
                          <SingleWord word={word} />
                        )
                    )}

                </>
            )}

            {user.id !== selectedList.userId && (
                <>
                <h4>No cheating!</h4>
                <p>Play from this list to find out the words for yourself.</p>
                </>
            )}
        </>
    )
}

export default ListOfWords;
