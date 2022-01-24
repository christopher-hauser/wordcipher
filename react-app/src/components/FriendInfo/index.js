import React from 'react';
import {useDispatch} from 'react-redux'

function FriendInfo({ friend }) {
    const dispatch = useDispatch();

    return (
        <>
            <div className='friend-info'>
                <h2>{friend.username}</h2>
                <p>x points</p>
                <p>x games completed</p>
                <p>x% win rate</p>
            </div>
        </>
    )
}

export default FriendInfo;
