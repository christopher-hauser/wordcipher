import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { acceptFriendRequest, declineFriendRequest } from '../../store/session';


const FriendRequest = ({ friendRequest }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    const acceptRequest = () => {
        dispatch(acceptFriendRequest(friendRequest.id, user.id))
        window.location.reload(true)
    }

    const declineRequest = () => {
        dispatch(declineFriendRequest(friendRequest.id, user.id))
        window.location.reload(true)
    }

    return (
        <>
        {!user.friends.includes(friendRequest.id) && (
            <>
            <p>{friendRequest.username}</p>
            <button onClick={acceptRequest}>Accept</button>
            <button onClick={declineRequest}>Decline</button>
            </>
        )}
        </>
    )
}

export default FriendRequest
