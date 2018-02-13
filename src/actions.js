import { createAction } from 'redux-actions';
import * as actions from './constants';

export const update = createAction(actions.UPDATE_VALUE, (name, value) => ({ name, value }));
export const reset = createAction(actions.RESET);
export const formStatus = createAction(actions.FORM_STATUS, (form) => ({ form }));
