import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
//Every page will use bootstrap classes
import 'bootstrap/dist/css/bootstrap.min.css';
import './globalStyles.css'
import App from './app';

ReactDOM.render(
    <React.StrictMode >
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

