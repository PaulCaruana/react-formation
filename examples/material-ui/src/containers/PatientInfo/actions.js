import { createAction } from 'redux-actions';
import * as actions from './constants';

export const create = createAction(actions.CREATE, (name, values) => {
    console.log(values);
    return { name, values };
});

