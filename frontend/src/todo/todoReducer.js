const INITIAL_STATE = {
    name: '',
    email: '',
    city: '',
    list: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NAME_CHANGED':
            return { ...state, name: action.payload }
        case 'TODO_SEARCHED':
            return { ...state, list: action.payload }
        case 'TODO_CLEAR':
            return { ...state, name: '', email: '', city: '' }
        case 'EMAIL_CHANGED':
            return { ...state, email: action.payload }
        case 'CITY_CHANGED':
            return { ...state, city: action.payload }
        default:
            return state
    }
}