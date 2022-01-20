const GET_CHALLENGES = 'challenges/GET_CHALLENGES'
const GET_MY_CHALLENGES = 'challenges/GET_MY_CHALLENGES'
const SEND_CHALLENGE = 'challenges/SEND_CHALLENGE'
const EDIT_CHALLENGE = 'challenges/EDIT_CHALLENGE'
const DELETE_CHALLENGE = 'challenges/DELETE_CHALLENGE'

const getChallenges = challenges => ({
    type: GET_CHALLENGES,
    payload: challenges
})

const getMyChallenges = challenges => ({
    type: GET_MY_CHALLENGES,
    payload: challenges
})

const sendChallenge = challenge => ({
    type: SEND_CHALLENGE,
    payload: challenge
})

const editChallenge = challenge => ({
    type: EDIT_CHALLENGE,
    payload: challenge
})

const deleteChallenge = challenge => ({
    type: DELETE_CHALLENGE,
    payload: challenge
})

//CHALLENGES I HAVE RECEIVED
export const getAllChallenges = id => async dispatch => {
    const res = await fetch(`/api/challenges/${id}`)
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
        dispatch(getChallenges(data))
        return data
    }
}

//CHALLENGES I HAVE SENT
export const getAllMyChallenges = id => async dispatch => {
    const res = await fetch(`/api/challenges/${id}/my-challenges`)
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
        dispatch(getMyChallenges(data))
        return data
    }
}

export const sendNewChallenge = challenge => async dispatch => {
  console.log(challenge)
    const res = await fetch(`/api/challenges/`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(challenge)
    })
    if (res.ok) {
      const data = await res.json();
      if (data.errors) {
        return data.errors
      }
      dispatch(sendChallenge(data))
      return data;
    }
  }

  export const editThisChallenge = challenge => async dispatch => {
    const res = await fetch(`/api/challenges/${challenge.id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(challenge)
    })
    if (res.ok) {
      const data = await res.json();
      if (data.errors) {
        return data.errors
      }
      dispatch(editChallenge(data))
      return data;
    }
  }

  export const deleteThisChallenge = id => async dispatch => {
      const res = await fetch(`/api/challenges/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
          dispatch(deleteChallenge(id))
          return 'Deleted.'
      }
  }

  const initialState = {'challenges': {}, 'myChallenges': {}}

  export default function (state = initialState, action) {
      let newState;
      let index;
      switch (action.type) {
          case GET_CHALLENGES:
            newState = {...state}
            newState['challenges'] = action.payload.challenges
            return newState;
          case GET_MY_CHALLENGES:
            newState = {...state}
            newState['myChallenges'] = action.payload.challenges
            return newState;
          case SEND_CHALLENGE:
            newState = {...state}
            newState['myChallenges'].push(action.payload)
            return newState
          case EDIT_CHALLENGE:
            newState = { ...state }
            index = newState['myChallenges'].findIndex(challenge => challenge.id === action.payload.id)
            state['myChallenges'].splice(index, 1, action.payload)
            return newState;
          case DELETE_CHALLENGE:
            newState = { ...state }
            index = newState['myChallenges'].findIndex(challenge => challenge.id === action.payload.id)
            delete newState['myChallenges'].splice(index, 1)
            return newState;
          default:
              return state;
      }
  }
