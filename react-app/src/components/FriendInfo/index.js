import React from 'react';
import {useDispatch} from 'react-redux'

function FriendInfo({ friend }) {
    const dispatch = useDispatch();

    return (
        <>
            <div className='friend-info'>
                <p id='friend-points'>{friend.points.toLocaleString("en-US")} pts</p>
                {friend.games_won > 0 && friend.games_played > 0 && (
                    <>
                    <p id='friend-wins'>{friend.games_won} wins</p>
                    <p id='friend-wl'>{Math.floor(friend.games_won/friend.games_played * 100)}% W/L</p>
                    </>
                )}
                {friend.games_played === 0 && (
                    <p id='friend-no-games'>This user hasn't played any games yet!</p>
                )}

            </div>
        </>
    )
}

export default FriendInfo;
