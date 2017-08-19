// src/index.js
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import Form from './components/Form';
import * as actions from './actions';
import store from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


injectTapEventPlugin();

const SmartForm = connect(state => state, actions)(Form);

const reduxMiddleware = applyMiddleware(thunk, createLogger());

export default props => (
    <Provider store={compose(reduxMiddleware)(createStore)(store)}>
        <MuiThemeProvider>
            <SmartForm {...props}/>
        </MuiThemeProvider>
    </Provider>
);
