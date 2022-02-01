import {CLEAR_AUTH, SET_AUTH, SET_TOKENS} from '../actionTypes/authActionTypes';
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

export function configureAuth(accessToken) {
    return async dispatch => {
        // now we can decode the token and send the request if the token is not expired
        const decodedToken = jwtDecode(accessToken);
        const {userId} = decodedToken;
        dispatch(setTokens({accessToken}));
        const {data: userDetails} = await getUser(userId);
        dispatch(setAuth({...userDetails}));
    }
}
