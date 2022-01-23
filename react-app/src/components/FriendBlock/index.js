import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeOneFriend, getAllFriends } from '../../store/session';

const FriendBlock = ({ friend }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    const removeThisFriend = async () => {
        const removed = await dispatch(removeOneFriend(friend.id, user.id))
        if (removed) {
            dispatch(getAllFriends)
        }
    }

    return (
        <>
            <p id={`friendusername-${friend.id}`}>{friend.username}</p>
            <button onClick={removeThisFriend}>Unfriend</button>
        </>
    )
}

export default FriendBlock
