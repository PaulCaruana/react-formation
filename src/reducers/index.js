import { combineReducers } from "redux";
import reduceReducers from 'reduce-reducers';
import formationReducer from 'react-formation/reducer';
import homeReducer from '../containers/HomePage/reducer';
import { formName as homePageForm, pageName as homePage } from '../containers/HomePage';

const rootReducer = combineReducers({
    [homePage]: homeReducer,
    [homePageForm]: formationReducer
});

export default rootReducer;
