import React from 'react';
import {useDispatch} from 'react-redux'

function FriendInfo({ friend }) {
    const dispatch = useDispatch();

    return (
        <>
            <div className='friend-info'>
                <h2>{friend.username}</h2>
                <p>{friend.points} pts</p>
                {friend.games_won > 0 && friend.games_played > 0 && (
                    <>
                    <p>{friend.games_won} wins</p>
                    <p>{Math.floor(friend.games_won/friend.games_played * 100)}% W/L</p>
                    </>
                )}
                {friend.games_played === 0 && (
                    <p>This user hasn't played any games yet!</p>
                )}

            </div>
        </>
    )
}

export default FriendInfo;
