import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { sendFriendRequest, undoFriendRequest } from '../store/session';

function User() {
  const dispatch = useDispatch()
  const { userId }  = useParams();
  const [user, setUser] = useState({});
  const sentRequest = useSelector(state => Boolean(state.session.user.friended_them.includes(+userId)))
  const [sentFriendRequest, setSentFriendRequest] = useState(sentRequest);
  const loggedInUserId = useSelector(state => state.session.user.id)
  const alreadyFriends = useSelector(state => state.session.user.friends.includes(+userId))

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  const submitRequest = () => {
    dispatch(sendFriendRequest(loggedInUserId, userId))
    setSentFriendRequest(!sentFriendRequest)
  }

  const undoRequest = () => {
    dispatch(undoFriendRequest(loggedInUserId, userId))
    setSentFriendRequest(!sentFriendRequest)
  }

  return (
    <>
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
    {loggedInUserId !== +userId && sentFriendRequest && !alreadyFriends && (
      <button onClick={undoRequest}>Undo Friend Request</button>
    )}
    {loggedInUserId !== +userId && !sentFriendRequest && !alreadyFriends &&  (
      <button onClick={submitRequest}>Send Friend Request</button>
    )}
    {loggedInUserId !== +userId && alreadyFriends && (
      <p>You and {user.username} are friends!</p>
    )}
    </>
  );
}
export default User;
