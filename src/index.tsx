import 'babel-polyfill';
import './main.scss';
import 'antd/dist/antd.min.css';

import React from 'react';

import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './App';


ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
);
