import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { acceptFriendRequest, declineFriendRequest } from '../../store/session';
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

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
                <div className='friend-button-container'>
                    <button className='accept-request' onClick={acceptRequest}><IoCheckmarkCircleOutline /></button>
                    <button className='decline-request' onClick={declineRequest}><MdOutlineCancel /></button>
                </div>
            </div>
        )}
        </>
    )
}

export default FriendRequest
