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
            {user.id !== selectedList.userId && Object.keys(selectedList).length > 0 && (
                <>
                    <div id='no-cheating-holder'>
                        <p id='no-cheating'>No cheating!</p>
                        <p id='word-instructions'>Play from this list to find out the words for yourself.</p>
                    </div>
                </>
            )}

            {user.id === selectedList.userId && Object.keys(selectedList).length > 0 && selectedList.words.length === 0 && (
                <>
                    <p id='empty-list'>Add words to your list for other users to play from.</p>
                </>
            )}

            {Object.keys(selectedList).length === 0 && (
                <>
                    <p id='empty-list'>No list currently selected.</p>
                </>
            )}
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

        </>
    )
}

export default ListOfWords;
