import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { sendFriendRequest, undoFriendRequest } from '../store/session';

function User({ user }) {
  const dispatch = useDispatch()
  // const { userId }  = useParams();
  // const [user, setUser] = useState({});
  const sentRequest = useSelector(state => Boolean(state.session.user.friended_them.includes(+user?.id)))
  const [sentFriendRequest, setSentFriendRequest] = useState(sentRequest);
  const loggedInUserId = useSelector(state => state.session.user.id)
  const alreadyFriends = useSelector(state => state.session.user.friends.includes(+user?.id))

  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })();
  // }, [userId]);

  // if (!user) {
  //   return null;
  // }

  const submitRequest = () => {
    dispatch(sendFriendRequest(loggedInUserId, user?.id))
    setSentFriendRequest(!sentFriendRequest)
  }

  const undoRequest = () => {
    dispatch(undoFriendRequest(loggedInUserId, user?.id))
    setSentFriendRequest(!sentFriendRequest)
  }

  return (
    <>
        <div className='users-name-points'>
          <h3 className='users-block-username'>{user?.username}</h3>
          <p className='users-block-points'>X pts</p>
        </div>
        <div className='users-options'>
          {loggedInUserId !== +user?.id && sentFriendRequest && !alreadyFriends && (
            <button className='already-friended' onClick={undoRequest}>Undo Friend Request</button>
          )}
          {loggedInUserId !== +user?.id && !sentFriendRequest && !alreadyFriends && (
            <button className='send-friend-button' onClick={submitRequest}>Send Friend Request</button>
          )}
          {loggedInUserId !== +user?.id && alreadyFriends && (
            <p>You and {user.username} are friends!</p>
          )}
        </div>
    </>
  );
}

export default User;
