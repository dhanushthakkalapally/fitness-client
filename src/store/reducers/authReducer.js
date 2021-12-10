import * as actionTypes from '../actionTypes/authActionTypes';

const initialState = {
    isAuthenticated: false
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH:
            const {firstName, lastName, dobYear} = action;
            const age = getAge(dobYear);
            //        This means user has now authenticated so store the token in local storage and token will be taken in every request
            localStorage.setItem("token", action.token);
            return {
                firstName,
                lastName,
                age,
                isAuthenticated: true
            };
            break;
        case actionTypes.CLEAR_AUTH:
            //remove the
            localStorage.removeItem('token');
            return {
                isAuthenticated: false
            };
        default:
            return {...state};

    }
};

const getAge = dobYear=> {
    const year = new Date().getFullYear();
    return (year - dobYear) - 1;
};

export default authReducer;