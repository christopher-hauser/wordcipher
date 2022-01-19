import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { declineFriendRequest, getAllFriendRequests, getAllFriends, getAllMyFriendRequests, sendFriendRequest, undoFriendRequest } from '../store/session';

function User() {
  const dispatch = useDispatch()
  const { userId }  = useParams();
  const [user, setUser] = useState({});
  const sentRequest = useSelector(state => Boolean(state.session.user.friended_them.includes(+userId)))
  const [sentFriendRequest, setSentFriendRequest] = useState(sentRequest);
  const loggedInUserId = useSelector(state => state.session.user.id)

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
    {loggedInUserId !== +userId && sentFriendRequest && (
      <button onClick={undoRequest}>Undo Friend Request</button>
    )}
    {loggedInUserId !== +userId && !sentFriendRequest && (
      <button onClick={submitRequest}>Send Friend Request</button>
    )}
    </>
  );
}
export default User;
