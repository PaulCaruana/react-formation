import { handleActions } from 'redux-actions';
import * as actions from './constants';

const initialState = {
    response: {}
};

export default handleActions({
    [actions.CREATE]: (state, action) => {
        const newState = { ...state };
        newState[action.payload.name] = action.payload.value;
        return newState;
    }
}, initialState);
