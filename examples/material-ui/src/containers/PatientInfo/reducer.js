import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as actions from './constants';
import { reducer as formationReducer } from 'react-formation';
import { formName as homePageForm, containerName as homePage } from './index';

const initialState = {
    response: {}
};

const reducer = handleActions({
    [actions.CREATE]: (state, action) => {
        const newState = { ...state };
        newState[action.payload.name] = action.payload.value;
        return newState;
    }
}, initialState);

export default combineReducers({
    [homePage]: reducer,
    [homePageForm]: formationReducer
});

