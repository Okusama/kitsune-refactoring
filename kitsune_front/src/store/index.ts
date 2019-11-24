import {IUserState} from "./user/types";
import {combineReducers, createStore} from "redux";
import {userReducer} from "./user/reducer";

export interface IRootState {
    user: IUserState
}

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        user: userReducer
    })
);

export default store