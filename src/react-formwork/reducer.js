import { handleActions } from 'redux-actions';
import * as form from './constants';

const initialState = { values: {} };

export default handleActions({
    [form.UPDATE_VALUE]: (state, action) => {
        const newState = { ...state };
        newState.values[action.payload.name] = action.payload.value;
        return newState;
    },

    [form.RESET]: (state, action) => {
        return initialState;
    }
}, initialState);
