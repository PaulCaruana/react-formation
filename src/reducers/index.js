import { combineReducers } from "redux";
import reduceReducers from 'reduce-reducers';
import formationReducer from 'react-formation/reducer';
import homeReducer from '../containers/HomePage/reducer';

const rootReducer = combineReducers({
    home: homeReducer,
    homeForm: formationReducer
});

export default rootReducer;
