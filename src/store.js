import { handleActions } from 'redux-actions';
import * as c from './constants';

const initialState = { values: {} };

export default handleActions({
    [c.FORM_UPDATE_VALUE](state, action) {
        const newState = { ...state };
        newState.values[action.payload.name] = action.payload.value;
        return newState;
    },

    [c.FORM_RESET](state, action) {
        return initialState;
    }
}, initialState);
