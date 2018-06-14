import axios from 'axios';


const initialState = {
    user: {},
    decks: []
}


const GET_USER_DATA = 'GET_USER_DATA'
const GET_DECK_DATA = 'GET_DECK_DATA'


// This is an action creator
export function getUser() {
    let userData = axios.get('/auth/user').then(res => res.data)

    return {
        type: GET_USER_DATA,
        payload: userData
    }
}

export function getDecks(user_id) {
    let deckData = axios.get(`/decks/user/${user_id}`).then(res => res.data)
    // .then(() => {
    //     let deckCardCnt = ""
    // })


    return {
        type: GET_DECK_DATA,
        payload: deckData
    }
}





// This is a reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })

        case GET_DECK_DATA + '_FULFILLED':
            return Object.assign({}, state, { decks: action.payload })

        default:
            return state;
    }
}