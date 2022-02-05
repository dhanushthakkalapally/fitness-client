import * as actionTypes from '../actionTypes/authActionTypes';
import {instance as client} from "../../appClient";

const initialState = {
    isAuthenticated: false,
    tokens: {},
    authLoading: true
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH:
            const {firstName, lastName,  userId} = action;
            // This means user has now authenticated so store the token in local storage and token will be taken in every request
            // now set the headers for the client
            return {
                firstName,
                lastName,
                userId,
                isAuthenticated: true
            };
        case actionTypes.SET_TOKENS:
            const {accessToken} = action;
            localStorage.setItem("accessToken", accessToken);
            client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            return {
                ...state,
                tokens: {
                    accessToken
                }
            }
        case actionTypes.CLEAR_AUTH:
            //remove the token from the local storage
            localStorage.removeItem('accessToken');
            return {
                isAuthenticated: false
            };
        case actionTypes.SET_AUTH_LOADING:
            const {authLoading} = action;
            return {
                ...state,
                authLoading
            }
        default:
            return {...state};

    }
};


export default authReducer;
