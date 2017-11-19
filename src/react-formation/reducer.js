import { handleActions } from 'redux-actions';
import * as actions from './constants';

const initialState = {
    values: {}
};

export default handleActions({
    [actions.UPDATE_VALUE]: (state, action) => {
        const newState = { ...state };
        newState.values[action.payload.name] = action.payload.value;
        return newState;
    },
    [actions.RESET]: (state, action) => {
        return initialState;
    }
}, initialState);
