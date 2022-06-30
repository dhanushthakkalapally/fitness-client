import {CLEAR_AUTH, SET_AUTH, SET_AUTH_LOADING, SET_TOKENS} from '../actionTypes/authActionTypes';
import {Auth} from "aws-amplify";

const calculateExpiry = (issueTime, expiryTime) => {
    return ((expiryTime * 1000) - new Date().getTime());
};


export function clearAuth() {
    return async (dispatch) => {
        try {
            await Auth.signOut()
            console.log("hiii")
            dispatch({type: CLEAR_AUTH})
        } catch (e) {
            console.error(e)
        }

    }

}

export function setAuth(details) {
    return {
        type: SET_AUTH,
        payload: {...details}
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

export function configureAuth() {
    return async (dispatch, getState) => {
        const {auth} = getState();
        const {isAuthenticated} = auth;
        // now we can decode the token and send the request if the token is not expired
        try {
            const user = await Auth.currentAuthenticatedUser();
            const {attributes, signInUserSession} = user;
            const {accessToken} = signInUserSession;
            const {payload} = accessToken;
            const {
                iat,
                exp
            } = payload;
            const expiryTime = calculateExpiry(iat, exp);
            if (!isAuthenticated) {
                dispatch(setAuth({isAuthenticated: true, userDetails: attributes}))
            }
            // TODO: NEED TO REMOVE THE TIMEOUT FUNCTION On Logout
            console.log("I have been called again", ((expiryTime / 1000) / 60))
            const timeOutFunc = setTimeout(() => {
                dispatch(configureAuth());
            }, expiryTime)
        } catch (exception) {
            console.log(exception);
            dispatch(clearAuth());
            dispatch(setAuthLoading(false));
        }
    }
}
