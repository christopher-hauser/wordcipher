const SET_GUESS = 'session/SET_GUESS';

const setGuess = (guessNo, word) => ({
    type: SET_GUESS,
    payload: {guessNo, word}
})

export const setThisGuess = (guessNo, word) => async dispatch => {
    dispatch(setGuess(guessNo, word))
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_GUESS:
            return {
                ...state,
                [action.payload.guessNo]: action.payload.word
            }
        default:
            return state;
    }
}
