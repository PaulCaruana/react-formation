import { handleActions } from 'redux-actions';
import * as actions from './constants';

const initialState = {
    values: {}
};

export default handleActions({
    [actions.CREATE]: (state, action) => {
        const newState = { ...state };
        newState.values[action.payload.name] = action.payload.value;
        return newState;
    }
}, initialState);
