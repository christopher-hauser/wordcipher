// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const GET_FRIENDS = 'session/GET_FRIENDS'
const GET_FRIEND_REQUESTS = 'session/GET_FRIEND_REQUESTS'
const GET_MY_FRIEND_REQUESTS = 'session/GET_MY_FRIEND_REQUESTS'
const SEND_REQUEST = 'session/SEND_REQUEST'
const UNDO_REQUEST = 'session/UNDO_REQUEST'
const ACCEPT_REQUEST = 'session/ACCEPT_REQUEST'
const DECLINE_REQUEST = 'session/DECLINE_REQUEST'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const getFriends = (friends) => ({
  type: GET_FRIENDS,
  payload: friends
})

const getFriendRequests = friendRequests => ({
  type: GET_FRIEND_REQUESTS,
  payload: friendRequests
})

const getMyFriendRequests = friendRequests => ({
  type: GET_MY_FRIEND_REQUESTS,
  payload: friendRequests
})

const sendRequest = friendRequest => ({
  type: SEND_REQUEST,
  payload: friendRequest
})

const undoRequest = friendRequest => ({
  type: UNDO_REQUEST,
  payload: friendRequest
})

const acceptRequest = friendRequest => ({
  type: ACCEPT_REQUEST,
  payload: friendRequest
})

const declineRequest = friendRequest => ({
  type: DECLINE_REQUEST,
  payload: friendRequest
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const getAllFriends = id => async dispatch => {
  const res = await fetch(`/api/friends/${id}`)
  if (res.ok) {
      const data = await res.json();
      if (data.errors) {
          return data.errors
      }
      dispatch(getFriends(data))
      return data
  }
}

export const getAllFriendRequests = id => async dispatch => {
  const res = await fetch(`/api/friends/${id}/friend-requests`)
  if (res.ok) {
      const data = await res.json();
      if (data.errors) {
          return data.errors
      }
      dispatch(getFriendRequests(data))
      return data
  }
}

export const getAllMyFriendRequests = id => async dispatch => {
  const res = await fetch(`/api/friends/${id}/my-friend-requests`)
  if (res.ok) {
      const data = await res.json();
      if (data.errors) {
          return data.errors
      }
      dispatch(getMyFriendRequests(data))
      return data
  }
}

export const sendFriendRequest = (frienderId, friendeeId) => async dispatch => {
  const res = await fetch(`/api/friends/${friendeeId}/new-friend-request`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frienderId, friendeeId })
  })
  if (res.ok) {
      const data = await res.json();
      if (data.errors) {
          return data.errors
      }
      dispatch(sendRequest(data))
      return data;
  }
}

export const undoFriendRequest = (frienderId, friendeeId) => async dispatch => {
  const res = await fetch(`/api/friends/${friendeeId}/undo-friend-request`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frienderId, friendeeId })
  })
  if (res.ok) {
      const data = await res.json();
      if (data.errors) {
          return data.errors
      }
      dispatch(undoRequest(data))
      return data;
  }
}

export const acceptFriendRequest = (frienderId, friendeeId) => async dispatch => {
  const res = await fetch(`/api/friends/${friendeeId}/accept-friend-request`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frienderId, friendeeId })
  })
  if (res.ok) {
      const data = await res.json();
      if (data.errors) {
          return data.errors
      }
      dispatch(acceptRequest(data))
      return data;
  }
}

export const declineFriendRequest = (frienderId, friendeeId) => async dispatch => {
  const res = await fetch(`/api/friends/${friendeeId}/decline-friend-request`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frienderId, friendeeId })
  })
  if (res.ok) {
      const data = await res.json();
      if (data.errors) {
          return data.errors
      }
      dispatch(declineRequest(data))
      return data;
  }
}

export default function reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case GET_FRIENDS:
      newState = state;
      newState.user.friends = action.payload
      return newState;
    case GET_FRIEND_REQUESTS:
      newState = state;
      newState.user.friended_me = action.payload
      return newState;
    case GET_MY_FRIEND_REQUESTS:
      newState = state;
      newState.user.friended_them = action.payload
      return newState;
    case SEND_REQUEST:
      newState = state;
      const current_requests = newState.user.friended_them
      newState.user.friended_them = [...current_requests, action.payload.id]
      return newState;
    case UNDO_REQUEST:
      newState = state;
      console.log(action.payload)
      const index = newState.user.friended_them.findIndex(el => el === action.payload.id)
      newState.user.friended_them.splice(index, 1)
      return newState;
    case ACCEPT_REQUEST:
      newState = state;
      newState.user.friends.push(action.payload.id)
      return newState;
    case DECLINE_REQUEST:
      newState = state;
      delete newState.user.friended_me.find(el => el === action.payload.id)
      return newState;
    default:
      return state;
  }
}
