const GET_LISTS = 'lists/GET_LISTS'
const GET_A_LIST = 'lists/GET_A_LIST'
const NEW_LIST = 'lists/NEW_LIST'
const EDIT_LIST = 'lists/EDIT_LIST'
const DELETE_LIST = 'lists/DELETE_LIST'
const ADD_WORD = 'lists/ADD_WORD'
const DELETE_WORD = 'lists/DELETE_WORD'

const getLists = lists => ({
    type: GET_LISTS,
    payload: lists
})

const getAList = list => ({
    type: GET_A_LIST,
    payload: list
})

const newList = list => ({
    type: NEW_LIST,
    payload: list
})

const editList = list => ({
    type: EDIT_LIST,
    payload: list
})

const deleteList = list => ({
    type: DELETE_LIST,
    payload: list
})

const addWord = word => ({
    type: ADD_WORD,
    payload: word
})

const deleteWord = word => ({
    type: DELETE_WORD,
    payload: word
})


export const getAllLists = () => async dispatch => {
    const res = await fetch(`/api/lists/`)
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
        dispatch(getLists(data))
        return data;
    }
}

export const getOneList = id => async dispatch => {
    const res = await fetch(`/api/lists/${id}`)
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
        dispatch(getAList(data))
        return data;
    }
}

export const addNewList = list => async dispatch => {
    const res = await fetch(`/api/lists/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(list)
    })
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
          return data.errors
        }
        dispatch(newList(data))
        return data;
      }
}

export const editThisList = list => async dispatch => {
    const res = await fetch(`/api/lists/`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(list)
    })
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
          return data.errors
        }
        dispatch(editList(data))
        return data;
      }
}

export const deleteThisList = id => async dispatch => {
    const res = await fetch(`/api/lists/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteList(id))
        return 'Deleted.'
    }
}

export const addNewWord = word => async dispatch => {
    const res = await fetch(`/api/lists/${word.listId}/add-word`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(word)
    })
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
          return data.errors
        }
        dispatch(addWord(data))
        return data;
      }
}

export const deleteOneWord = word => async dispatch => {
    const res = await fetch(`/api/lists/${word.listId}/add-word`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(deleteWord(word.listId))
        return 'Deleted.'
    }
}

const initialState = {'lists': [], 'selected_list': {}}

export default function (state = initialState, action) {
    let newState;
    let index;
    switch (action.type) {
        case GET_LISTS:
            newState = {...state}
            newState['lists'] = action.payload.lists
            return newState;
        case GET_A_LIST:
            newState = {...state}
            newState['selected_list'] = action.payload
            return newState;
        case NEW_LIST:
            newState = {...state}
            newState['lists'].push(action.payload)
            newState['selected_list'] = action.payload
            return newState;
        case EDIT_LIST:
            newState = {...state}
            index = newState['lists'].findIndex(list => list.id === action.payload.id)
            newState['lists'].splice(index, 1, action.payload)
            newState['selected_list'] = action.payload
            return newState;
        case DELETE_LIST:
            newState = {...state}
            index = newState['lists'].findIndex(list => list.id === action.payload.id)
            newState['lists'].splice(index, 1)
            return newState;
        case ADD_WORD:
            newState = {...state}
            newState['selected_list']['words'].push(action.payload)
            return newState;
        case DELETE_WORD:
            newState = {...state}
            index = newState['selected_list'].findIndex(word => word.id === action.payload.id)
            newState['selected_list'].splice(index, 1)
            return newState;
        default:
            return state;
    }
}

// const GET_LISTS = 'lists/GET_LISTS'
// const GET_A_LIST = 'lists/GET_A_LIST'
// const NEW_LIST = 'lists/NEW_LIST'
// const EDIT_LIST = 'lists/EDIT_LIST'
// const DELETE_LIST = 'lists/DELETE_LIST'
// const ADD_WORD = 'lists/ADD_WORD'
// const DELETE_WORD = 'lists/DELETE_WORD'
