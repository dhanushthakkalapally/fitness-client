import {combineReducers, createStore} from 'redux';
import authReducer from "./authReducer";

const combinedState = combineReducers({
    auth: authReducer
});

export default () => createStore(combinedState);