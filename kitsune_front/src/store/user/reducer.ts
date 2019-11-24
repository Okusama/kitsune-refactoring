import { UserActions, IUserState } from "./types";
import { Constants } from "./constants";

const INITIAL_STATE: IUserState = {
    id: "",
    avatar: "",
    isLogin: false,
    isAdmin: false,
    token: ""
};

export function userReducer(state: IUserState = INITIAL_STATE, action: UserActions): IUserState{

    switch (action.type) {

        case Constants.ADMIN: {

            let id = action.payload.id;
            let avatar = action.payload.avatar;
            let isLogin = true;
            let isAdmin = true;
            let token = action.payload.token;

            return Object.assign({}, state, {id, avatar, isLogin, isAdmin, token});

        } case Constants.LOGIN: {

            let id = action.payload.id;
            let avatar = action.payload.avatar;
            let isLogin = true;
            let isAdmin = false;
            let token = action.payload.token;

            return Object.assign({}, state, {id, avatar, isLogin, isAdmin, token});

        } case Constants.LOGOUT: {

            let id = "";
            let avatar = "";
            let isLogin = false;
            let isAdmin = false;
            let token = "";

            return Object.assign({}, state, {id, avatar, isLogin, isAdmin, token});

        } case Constants.UPDATE_AVATAR: {

            let avatar = action.payload.avatar;

            return Object.assign({}, state, {avatar});

        } default: {

            return state;

        }

    }

}