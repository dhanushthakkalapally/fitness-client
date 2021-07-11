import * as actionTypes from '../actionTypes/authActionTypes';

const initialState = {
    isAuthenticated: false,
    firstName: undefined,
    lastName: undefined,
    age: undefined
};


const authReducer = (state = initialState, action) => {
    switch (action.Type) {
        case actionTypes.SET_AUTH:
            //        This means user has now authenticated so store the token in local storage and token will be taken in every request
            localStorage.setItem("loginToken", action.loginToken);
            const {firstName, lastName, dobYear, dobMonth} = action;
            const year = new Date().getFullYear();
            const month = new Date().getMonth();
            console.log(month, year, dobYear, dobMonth);
            console.log(month, year, dobYear, dobMonth);
            return {
                firstName,
                lastName,
                age: 23,
                isAuthenticated: true
            };
            break;
        default:
            return {...state};

    }
};

export default authReducer;