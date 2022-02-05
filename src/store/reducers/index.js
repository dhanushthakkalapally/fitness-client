import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import authReducer from "./authReducer";

const combinedState = combineReducers({
    auth: authReducer
});

const store = () => createStore(combinedState, applyMiddleware(thunk));

export default store;
