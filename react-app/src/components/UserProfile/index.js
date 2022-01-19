import React from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'


function UserProfile() {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    

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
            {user.friends.map(friend => (
                <li>{friend}</li>
            ))}
            <h2>Friend Requests</h2>
            {user.friended_me.map(friendRequest => (
                <>
                <p>{friendRequest}</p>
                <button>Accept</button>
                <button>Decline</button>
                </>
            ))}
        </div>
        </>
    )
}

export default UserProfile
