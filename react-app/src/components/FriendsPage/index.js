import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FriendRequest from '../FriendRequest';
import FriendBlock from '../FriendBlock';
import './style.css'
import FriendInfo from '../FriendInfo';

function FriendsPage() {
    const user = useSelector(state => state.session.user)
    const [friends, setFriends] = useState([])
    const [friendRequests, setFriendRequests] = useState([])
    const [selectedFriend, setSelectedFriend] = useState('')

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

    const selectFriend = e => {
        if (selectedFriend) {
            document.getElementById(`friend-${selectedFriend.id}`).className = 'friend-container'
        }

        const friendId = e.target.id.split('-')[1];
        const friend = friends.find(friend => friend.id == friendId);
        const set = setSelectedFriend(friend);

        if (set) {
            document.getElementById(`friend-${selectedFriend.id}`).className = 'friend-selected';
        }

        return friend;
    }



    return (
        <>
            <div id='friends-page-container'>
                <div id='friends-and-requests'>
                    <div id='left-friends'>
                        <div id='friends-background'></div>
                        <div id='friend-list-and-info'>
                            <div id='friends-blocks-container'>
                                <h2 id='friends-title'>FRIENDS</h2>
                                {friends.map(friend => (
                                    <div onClick={selectFriend} className='friend-container' id={`friend-${friend.id}`}>
                                        <FriendBlock friend={friend} />
                                    </div>
                                ))}
                            </div>
                            <div id='outer-friend-info-container'>
                                <div id='friend-info-container'>
                                    {!selectedFriend && (
                                        <h2>Select a friend to view their information.</h2>
                                    )}

                                    {selectedFriend && (
                                        <>
                                            <div id='selected-friend-pro-circle'>
                                                <h2 className='friend-first-letter'>{selectedFriend.username[0].toUpperCase()}</h2>
                                            </div>
                                            <FriendInfo friend={selectedFriend} />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='right-requests'>
                        <h2>FRIEND REQUESTS</h2>
                        <div>
                            {user.friended_me.length === 0 && (
                                <p>You have no friend requests at the moment.</p>
                            )}
                            {friendRequests.map(friendRequest => (
                                <FriendRequest friendRequest={friendRequest} />
                            )
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FriendsPage
