import React from 'react';
import { useSelector } from 'react-redux';
import AddWordForm from '../AddWordForm';
import SingleWord from '../SingleWord';

const ListOfWords = () => {
    const user = useSelector(state => state.session.user)
    const selectedList = useSelector(state => state.lists.selected_list)

    return (
        <>
            <div id='top-of-words'>
                <h2 id='words-title'>WORDS</h2>
                {user.id === selectedList.userId && Object.keys(selectedList).length > 0 && (
                    <AddWordForm list={selectedList} />
                )}
            </div>
            {user.id === selectedList.userId && Object.keys(selectedList).length > 0 && (
                <>
                    <div id='word-list-container'>
                        {selectedList.words.map(word => (
                            <SingleWord word={word} />
                        )
                        )}
                    </div>
                </>
            )}

            {user.id !== selectedList.userId && Object.keys(selectedList).length > 0 && (
                <>
                    <h4 id='no-cheating'>No cheating!</h4>
                    <p id='word-instructions'>Play from this list to find out the words for yourself.</p>
                </>
            )}

            {Object.keys(selectedList).length === 0 && (
                <>
                <p>No list currently selected.</p>
                </>
            )}
        </>
    )
}

export default ListOfWords;
