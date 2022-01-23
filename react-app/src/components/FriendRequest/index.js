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
            <div className='friend-request-container'>
                <h3 className='friend-request-username'>{friendRequest.username}</h3>
                <button className='accept-request' onClick={acceptRequest}>Accept</button>
                <button className='decline-request' onClick={declineRequest}>Decline</button>
            </div>
        )}
        </>
    )
}

export default FriendRequest
