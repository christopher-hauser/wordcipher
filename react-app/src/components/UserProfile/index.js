import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import FriendRequest from '../FriendRequest';
import FriendBlock from '../FriendBlock';


function UserProfile() {
    const user = useSelector(state => state.session.user)
    
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
        </>
    )
}

export default UserProfile
