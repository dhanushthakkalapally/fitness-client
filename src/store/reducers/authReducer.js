import * as actionTypes from '../actionTypes/authActionTypes';

const initialState = {
    isAuthenticated: false
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH:
            const {firstName, lastName, accessToken, userId} = action;
            //        This means user has now authenticated so store the token in local storage and token will be taken in every request
            localStorage.setItem("accessToken", accessToken);
            return {
                firstName,
                lastName,
                userId,
                isAuthenticated: true
            };
            break;
        case actionTypes.CLEAR_AUTH:
            //remove the
            localStorage.removeItem('accessToken');
            return {
                isAuthenticated: false
            };
        default:
            return {...state};

    }
};


export default authReducer;
