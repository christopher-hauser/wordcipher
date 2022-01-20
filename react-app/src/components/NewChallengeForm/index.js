import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { sendNewChallenge } from "../../store/challenges";

const NewChallengeForm = () => {
    const [errors, setErrors] = useState([])
    const [friend, setFriend] = useState('')
    const [friends, setFriends] = useState([])
    const [word, setWord] = useState('')
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(async () => {
        const myFriendsObj = await loadFriends(user.id);
        const myFriends = myFriendsObj.friends
        setFriends(myFriends)
    }, [])

    const loadFriends = async (id) => {
        const data = await fetch(`/api/friends/${id}`).then(res => {
            return res.json();
        })
        return data;
    }

    const submit = async e => {
        e.preventDefault();

        const newChallenge = {
            'challengerId': user.id,
            'recipientId': +friend,
            'word': word,
        }

        let submitted = await dispatch(sendNewChallenge(newChallenge))
        if (Array.isArray(submitted)) {
            setErrors(submitted)
        }
        else {
            history.push('/')
        }
    }


    return (
        <div>
            <form onSubmit={submit}>
                <div className="errors">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label htmlFor='recipientId'>Friend</label>
                    <select
                        name='recipientId'
                        placeholder="Select a friend..."
                        value={friend}
                        onChange={e => setFriend(e.target.value)}
                    >
                        <option value=''>Select a friend...</option>
                        {friends.map((friend) => {
                            const friendId = parseInt(friend.id)
                            return (
                            <option value={friendId}>{friend.username}</option>
                        )})}
                    </select>
                </div>
                <div>
                    <label htmlFor='word'>Challenge Word</label>
                    <input
                        name='word'
                        placeholder="Enter your word..."
                        value={word}
                        onChange={e => setWord(e.target.value)}
                    />
                </div>
                <button type='submit'>Send Challenge</button>
            </form>
        </div>
    )
}

export default NewChallengeForm
