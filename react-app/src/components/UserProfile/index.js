import React from 'react';
import { useSelector } from 'react-redux'
import './style.css'

function UserProfile() {
    const user = useSelector(state => state.session.user)

    return (
        <>
            <div id='profile-container'>
                <div id='profile-inner-container'>
                    <div id='user-identity'>
                        <div id='user-circle'>
                            <h2 id='user-circle-letter'>{user.username[0]}</h2>
                        </div>
                        <h3 id='users-username'>{user.username.toUpperCase()}</h3>
                        <p id='users-email'>{user.email}</p>
                        {user.bio && (
                            <p>{user.bio}</p>
                        )}
                    </div>
                    <p id='users-points'>2,500 pts</p>
                    <div id='games-info-container'>
                        <p id='wins'>34 WINS</p>
                        <p id='percent'>100%</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile
