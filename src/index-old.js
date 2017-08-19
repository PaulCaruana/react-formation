import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import promise from "redux-promise";
import thunk from 'redux-thunk';
import HomePage from './containers/HomePage';
import reducers from './reducers';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//const createStoreWithMiddleware = applyMiddleware(promise, createLogger())(createStore);
//createStoreWithMiddleware(reducers)
const reduxMiddleware = applyMiddleware(thunk, createLogger());

ReactDOM.render(
    <Provider store={compose(reduxMiddleware)(createStore)(store)}>
        <MuiThemeProvider>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="*" component={HomePage} />
                    </Switch>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
    , document.querySelector('.container'));
