import * as actionTypes from '../actionTypes/authActionTypes';
import {instance as client} from "../../appClient";

const initialState = {
    isAuthenticated: false,
    userDetails: {}
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH:
            // This means user has now authenticated so store the token in local storage and token will be taken in every request
            // now set the headers for the client
            const {payload} = action;
            const {userDetails, isAuthenticated} = payload
            return {
                isAuthenticated,
                ...userDetails
            };
        case actionTypes.SET_TOKENS:
            const {accessToken} = action;
            client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            return {
                ...state,
                tokens: {
                    accessToken
                }
            }
        case actionTypes.CLEAR_AUTH:
            //remove the token from the local storage
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
