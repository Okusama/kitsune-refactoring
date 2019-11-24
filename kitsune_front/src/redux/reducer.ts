import {combineReducers} from "redux";
import {userReducer} from "./reducers/userReducer";

const ROOT_REDUCER = combineReducers({
    user: userReducer
});

export default ROOT_REDUCER;