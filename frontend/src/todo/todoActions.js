import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const changeName = event => ({
    type: 'NAME_CHANGED',
    payload: event.target.value
})

export const changeEmail= event => ({
    type: 'EMAIL_CHANGED',
    payload: event.target.value
})

export const changeCity = event => ({
    type: 'CITY_CHANGED',
    payload: event.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const name = getState().todo.name
        const search = name ? `&name__regex=/${name}/` : ''
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
        .then(resp => dispatch({type: 'TODO_SEARCHED', payload: resp.data}))
    }
}

export const add = (data) => {
    console.log(data)
    return dispatch => {
        axios.post(URL,  data)
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}

export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => dispatch(search()))
    }
}

export const markAsPending = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => dispatch(search()))
    }
}

export const remove = (todo) => {
    return dispatch => {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => dispatch(search()))
    }
}

export const clear = () => {
    return [{ type: 'TODO_CLEAR' }, search()]
}