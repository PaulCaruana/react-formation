import { combineReducers } from "redux";
import formationReducer from 'react-formation/reducer';

const rootReducer = combineReducers({
    home: formationReducer
});

export default rootReducer;
