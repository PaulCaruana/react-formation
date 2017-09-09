import { createAction } from 'redux-actions';
import * as form from './constants';

export const update = createAction(form.UPDATE_VALUE, (name, value) => ({ name, value }));
export const reset = createAction(form.RESET);
