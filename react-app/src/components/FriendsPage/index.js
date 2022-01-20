import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FriendRequest from '../FriendRequest';
import FriendBlock from '../FriendBlock';

function FriendsPage() {
    const user = useSelector(state => state.session.user)
    const [friends, setFriends] = useState([])
    const [friendRequests, setFriendRequests] = useState([])

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

export default FriendsPage