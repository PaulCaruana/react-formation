
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from "redux-promise";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PatientInfo from './containers/PatientInfo';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const reduxMiddleware = applyMiddleware(thunk);

injectTapEventPlugin();


//const createStoreWithMiddleware = applyMiddleware(promise, createLogger())(createStore);
//createStoreWithMiddleware(reducers)


ReactDOM.render(
    <Provider store={compose(reduxMiddleware)(createStore)(reducers)}>
        <MuiThemeProvider>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="*" component={PatientInfo} />
                    </Switch>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();