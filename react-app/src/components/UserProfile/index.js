import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getAllFriendRequests, getAllFriends, acceptFriendRequest, declineFriendRequest, removeOneFriend } from '../../store/session';
import FriendRequest from '../FriendRequest';
import FriendBlock from '../FriendBlock';


function UserProfile() {
    const user = useSelector(state => state.session.user)
    const [friends, setFriends] = useState([])
    const [friendRequests, setFriendRequests] = useState([])
    const dispatch = useDispatch();

    useEffect(async () => {
        const incRequests = await loadFriendRequests(user.id)
        const requests = incRequests.requests
        setFriendRequests(requests)

        const myFriendsObj = await loadFriends(user.id);
        const myFriends = myFriendsObj.friends
        setFriends(myFriends)
    }, [])

    const loadFriendRequests = async (id) => {
        const data = await fetch(`/api/friends/${id}/friend-requests`).then(res => {
            return res.json();
        })
        return data
    }

    const loadFriends = async (id) => {
        const data = await fetch(`/api/friends/${id}`).then(res => {
            return res.json();
        })
        return data;
    }

    return (
        <>
            <div>
                <h2>{user.username}</h2>
                <p>{user.email}</p>
                {user.bio && (
                    <p>{user.bio}</p>
                )}
                <p>Games Won: x</p>
                <p>Points: x</p>
            </div>
            <div>
                <h2>Friends</h2>
                {friends.map(friend => (
                    <FriendBlock friend={friend} />
                ))}
                <h2>Friend Requests</h2>
                {user.friended_me.length === 0 && (
                    <p>You have no friend requests at the moment.</p>
                )}
                {friendRequests.map(friendRequest => (
                    <FriendRequest friendRequest={friendRequest} />
                )
                )}
            </div>
        </>
    )
}

export default UserProfile
