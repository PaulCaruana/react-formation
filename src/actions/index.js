import { createAction } from 'redux-actions';
import * as c from '../constants';

export const update = createAction(c.FORM_UPDATE_VALUE, (name, value) => ({ name, value }));
export const reset = createAction(c.FORM_RESET);
