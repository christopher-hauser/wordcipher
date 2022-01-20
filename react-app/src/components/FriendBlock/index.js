import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeOneFriend } from '../../store/session';

const FriendBlock = ({ friend }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    const removeThisFriend = () => {
        dispatch(removeOneFriend(friend.id, user.id))
        window.location.reload(true)
    }

    return (
        <div>
            <p>{friend.username}</p>
            <button onClick={removeThisFriend}>Unfriend</button>
        </div>
    )
}

export default FriendBlock
