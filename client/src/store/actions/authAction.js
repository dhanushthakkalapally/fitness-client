import {CLEAR_AUTH, SET_AUTH} from '../actionTypes/authActionTypes'

export function clearAuth() {
    return {
        type: CLEAR_AUTH
    }
}

export function setAuth(details) {
    return {
        type: SET_AUTH,
        ...details
    }
}