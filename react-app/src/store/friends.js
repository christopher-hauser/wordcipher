// //constants
// const GET_FRIENDS = 'friends/GET_FRIENDS'
// const GET_FRIEND_REQUESTS = 'friends/GET_FRIEND_REQUESTS'
// const GET_MY_FRIEND_REQUESTS = 'friends/GET_MY_FRIEND_REQUESTS'
// const SEND_REQUEST = 'friends/SEND_REQUEST'
// const UNDO_REQUEST = 'friends/UNDO_REQUEST'
// const ACCEPT_REQUEST = 'friends/ACCEPT_REQUEST'
// const DECLINE_REQUEST = 'friends/DECLINE_REQUEST'

// const getFriends = (friends) => ({
//     type: GET_FRIENDS,
//     payload: friends
// })

// const getFriendRequests = friendRequests => ({
//     type: GET_FRIEND_REQUESTS,
//     payload: friendRequests
// })

// const getMyFriendRequests = friendRequests => ({
//     type: GET_MY_FRIEND_REQUESTS,
//     payload: friendRequests
// })

// const sendRequest = friendRequest => ({
//     type: SEND_REQUEST,
//     payload: friendRequest
// })

// const undoRequest = friendRequest => ({
//     type: UNDO_REQUEST
// })

// const acceptRequest = friendRequest => ({
//     type: ACCEPT_REQUEST,
//     payload: friendRequest
// })

// const declineRequest = () => ({
//     type: DECLINE_REQUEST
// })

// export const getAllFriends = id => async dispatch => {
//     const res = await fetch(`/api/friends/${id}`)
//     if (res.ok) {
//         const data = await res.json();
//         if (data.errors) {
//             return data.errors
//         }
//         dispatch(getFriends(data))
//         return data
//     }
// }

// export const getAllFriendRequests = id => async dispatch => {
//     const res = await fetch(`/api/friends/${id}/friend-requests`)
//     if (res.ok) {
//         const data = await res.json();
//         if (data.errors) {
//             return data.errors
//         }
//         dispatch(getFriendRequests(data))
//         return data
//     }
// }

// export const getAllMyFriendRequests = id => async dispatch => {
//     const res = await fetch(`/api/friends/${id}/my-friend-requests`)
//     if (res.ok) {
//         const data = await res.json();
//         if (data.errors) {
//             return data.errors
//         }
//         dispatch(getMyFriendRequests(data))
//         return data
//     }
// }

// export const sendFriendRequest = (frienderId, friendeeId) => async dispatch => {
//     const res = await fetch(`/api/friends/${friendeeId}/new-friend-request`, {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ frienderId, friendeeId })
//     })
//     if (res.ok) {
//         const data = await res.json();
//         if (data.errors) {
//             return data.errors
//         }
//         dispatch(sendRequest(data))
//         return data;
//     }
// }

// export const undoFriendRequest = (frienderId, friendeeId) => async dispatch => {
//     const res = await fetch(`/api/friends/${friendeeId}/undo-friend-request`, {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ frienderId, friendeeId })
//     })
//     if (res.ok) {
//         const data = await res.json();
//         if (data.errors) {
//             return data.errors
//         }
//         dispatch(undoRequest())
//         return data;
//     }
// }

// export const acceptFriendRequest = (frienderId, friendeeId) => async dispatch => {
//     const res = await fetch(`/api/friends/${friendeeId}/accept-friend-request`, {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ frienderId, friendeeId })
//     })
//     if (res.ok) {
//         const data = await res.json();
//         if (data.errors) {
//             return data.errors
//         }
//         dispatch(acceptRequest(data))
//         return data;
//     }
// }

// export const declineFriendRequest = (frienderId, friendeeId) => async dispatch => {
//     const res = await fetch(`/api/friends/${friendeeId}/decline-friend-request`, {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ frienderId, friendeeId })
//     })
//     if (res.ok) {
//         const data = await res.json();
//         if (data.errors) {
//             return data.errors
//         }
//         dispatch(declineRequest())
//         return data;
//     }
// }

// const initialState = { friends: {}, friendRequests: {}, myFriendRequests: {} }

// export default function (state = initialState, action) {
//     let newState;
//     switch (action.type) {
//         case GET_FRIENDS:
//             state.friends = {};
//             action.payload.friends.map((friend) => state.friends[friend.id] = friend)
//             return state;
//         case GET_FRIEND_REQUESTS:
//             state.friendRequests = {};
//             action.payload.requests.map(friendRequest => state.friendRequests[friendRequest.id] = friendRequest)
//             return state;
//         case GET_MY_FRIEND_REQUESTS:
//             state.myFriendRequests = {};
//             action.payload.requests.map(friendRequest => state.myFriendRequests[friendRequest.id] = friendRequest)
//             return state;
//         case SEND_REQUEST:
//             const currentState = state.myFriendRequests
//             state.myFriendRequests = { ...currentState, [action.payload.id]: action.payload }
//             return state;
//         case UNDO_REQUEST:
//             newState = { ...state }
//             delete newState.myFriendRequests[action.payload.id]
//             return newState
//         case ACCEPT_REQUEST:
//             newState = { ...state }
//             const currentFriends = state.friends
//             delete newState.friendRequests[action.payload.id]
//             newState.friends = { ...currentFriends, [action.payload.id]: action.payload }
//             return newState;
//         case DECLINE_REQUEST:
//             newState = { ...state }
//             delete newState.friendRequests[action.payload.id]
//             return newState;
//         default:
//             return state;
//     }
// }
