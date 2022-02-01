import {CLEAR_AUTH, SET_AUTH, SET_AUTH_LOADING, SET_TOKENS} from '../actionTypes/authActionTypes';
import jwtDecode from "jwt-decode";
import {getUser} from "../../appClient";

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

export function setTokens(tokens) {
    return {
        type: SET_TOKENS,
        ...tokens
    }
}

export function setAuthLoading(status) {
    return {
        type: SET_AUTH_LOADING,
        authLoading: status
    }
}

export function configureAuth(accessToken) {
    return async dispatch => {
        // now we can decode the token and send the request if the token is not expired
        const decodedToken = jwtDecode(accessToken);
        const {userId} = decodedToken;
        dispatch(setTokens({accessToken}));
        const {data: userDetails} = await getUser(userId);
        dispatch(setAuth({...userDetails}));
        dispatch(setAuthLoading(false));
    }
}

export function checkAuth() {
    return async dispatch => {
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            // if there is access token then don't worry
            console.log(accessToken)
            dispatch(configureAuth(accessToken))
        } else {
            // if there is no access token then
            dispatch(setAuthLoading(false))
        }
    }
}
