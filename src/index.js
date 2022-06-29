import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globalStyles.css';
import Store from '../src/store/reducers';
import {Provider} from "react-redux";
import App from './app';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import "./amplify";
import {Auth} from "aws-amplify";

console.log("here is the Auth config", Auth);

ReactDOM.render(
    <React.StrictMode>
        {/*Now the App has connected to the Global state,
        where components can subscribe for the state and dispatch
        actions to manipulate the state*/}
        <Provider store={Store()}>
            <DndProvider backend={HTML5Backend}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
                </DndProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

