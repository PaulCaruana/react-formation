
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';
import App from './app';
import * as actions from './actions';

import reducers from './reducers';

const reduxMiddleware = applyMiddleware(thunk, createLogger());

ReactDOM.render(
    <Provider store={compose(reduxMiddleware)(createStore)(store)}>
        <MuiThemeProvider>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="*" component={App} />
                    </Switch>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
    , document.querySelector('.container'));