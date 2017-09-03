import { combineReducers } from "redux";
import verityForm from '../components/reducer';

const rootReducer = combineReducers({
    home: verityForm
});

export default rootReducer;
