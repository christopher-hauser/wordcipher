import React from "react"
import { useSelector } from 'react-redux';

const IndividualList = ({ list }) => {
    const user = useSelector(state => state.session.user);

    return (
        <div>
            <p>{list.name}</p>
            {list.userId !== user.id && (
                <button>Play</button>
            )}
            {list.userId === user.id && (
                //ADD WORD FORM
                <>
                    {list.words.map(word => {
                        <>
                        <p>{word.word}</p>
                        <button>Remove</button>
                        </>
                    })}
                </>
            )}
        </div>
    )
}

export default IndividualList;
