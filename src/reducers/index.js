import { combineReducers } from "redux";
import formwork from 'react-formation/reducer';

const rootReducer = combineReducers({
    home: formwork
});

export default rootReducer;
