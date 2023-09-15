import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FriendRequest from '../FriendRequest';
import FriendBlock from '../FriendBlock';
import './style.css'
import FriendInfo from '../FriendInfo';
import { getOneFriend } from '../../store/session';

function FriendsPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [friends, setFriends] = useState([])
    const [friendRequests, setFriendRequests] = useState([])
    const selectedFriend = useSelector(state => state.session.selected_user)

    useEffect(async () => {
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

        const incRequests = await loadFriendRequests(user.id)
        const requests = incRequests.requests
        setFriendRequests(requests)

        const myFriendsObj = await loadFriends(user.id);
        const myFriends = myFriendsObj.friends
        setFriends(myFriends)
    }, [user.id])

    const selectFriend = async e => {
        let previousSelectedFriend;
        if (selectedFriend) {
            previousSelectedFriend = document.getElementById(`friend-${selectedFriend.id}`)
        }

        const friendId = e.target.id.split('-')[1];
        const friend = friends.find(friend => friend.id == friendId); // Must use '==' due to type conversion
        const friendGot = await dispatch(getOneFriend(friend))

        if (friendGot) {
            if (previousSelectedFriend) {
                previousSelectedFriend.className = 'friend-container'
            }
            document.getElementById(`friend-${friendGot.id}`).className = 'friend-selected';
        }
    }

    return (
        <>
            <div id='friends-page-container'>
                <div id='friends-and-requests'>
                    <div id='left-friends'>
                        <div id='friends-background'>
                            <p id='friends-top-title'>F R I E N D S</p>
                        </div>
                        <div id='friend-list-and-info'>
                            <div id='friends-blocks-container'>
                                <h2 id='friends-title'>FRIENDS</h2>
                                {friends.map(friend => (
                                    <div onClick={selectFriend} className='friend-container' id={`friend-${friend.id}`} key={`friend-${friend.id}`}>
                                        <FriendBlock friend={friend} />
                                    </div>
                                ))}
                            </div>
                            <div id='outer-friend-info-container'>
                                <div id='friend-info-container'>
                                    {!selectedFriend && (
                                        <h2 id='select-a-friend-to-view'>Select a friend to view their information.</h2>
                                    )}

                                    {selectedFriend && (
                                        <>
                                            <div id='selected-friend-header'>
                                                <div id='selected-friend-pro-circle'>
                                                    <h2 className='friend-first-letter'>{selectedFriend.username[0].toUpperCase()}</h2>
                                                </div>
                                                <h2 id='friends-username'>{selectedFriend.username}</h2>
                                            </div>
                                            <div id='selected-friend-body'>
                                                <FriendInfo friend={selectedFriend} />
                                            </div>
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
