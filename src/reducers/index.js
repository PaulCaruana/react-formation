import { combineReducers } from "redux";
import formwork from 'react-formwork/reducer';

const rootReducer = combineReducers({
    home: formwork
});

export default rootReducer;
