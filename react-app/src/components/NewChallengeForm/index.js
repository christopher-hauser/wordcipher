import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getAllMyChallenges, sendNewChallenge } from "../../store/challenges";

const NewChallengeForm = () => {
    const [errors, setErrors] = useState([])
    const [friend, setFriend] = useState('')
    const [friends, setFriends] = useState([])
    const [word, setWord] = useState('')
    const user = useSelector(state => state.session.user)
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

    const validate = async () => {
        let errors = [];
        if (word.length !== 5) errors.push('Word must be exactly 5 characters.')
        if (!friend) errors.push('Please select a friend to send your word to.')
        await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": "ae0e954da5msh9667458788d83f1p140318jsn677fc8a6e57c"
            }
        }).then(response => {
            if (!response.ok) {
                errors.push('Word must be found in the dictionary.')
            }
            return response;
        }).catch(err => {
            console.error(err);
        });

        return errors;
    }

    const submit = async e => {
        e.preventDefault();

        const newChallenge = {
            'challengerId': user.id,
            'recipientId': +friend,
            'word': word.toUpperCase()
        }

        let errors = await validate();

        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        let submitted = await dispatch(sendNewChallenge(newChallenge))
        if (Array.isArray(submitted)) {
            setErrors(submitted)
        }
        else {
            dispatch(getAllMyChallenges(user.id))
            setErrors([])
            setFriend('')
            setWord('')
        }
    }


    return (
        <div>
            <form id='new-challenge-form' onSubmit={submit}>
                <div className="challenge-error-div">
                    {errors.map((error, ind) => (
                        <div className="challenge-error-item" key={ind}>{error}</div>
                    ))}
                </div>
                <div id='new-challenge-inputs'>
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
                            )
                        })}
                    </select>
                    <input
                        name='word'
                        placeholder="Enter word..."
                        value={word}
                        onChange={e => setWord(e.target.value)}
                    />
                    <button type='submit'>Send</button>
                </div>
            </form>
        </div>
    )
}

export default NewChallengeForm
