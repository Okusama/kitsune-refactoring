import { USER } from "../constants";

export interface IUserState {
    id: string,
    avatar: string,
    isAdmin: boolean,
    isLogin: boolean,
    token: string
}

const INITIAL_STATE = <IUserState>{
    id: "",
    avatar: "",
    isLogin: false,
    isAdmin: false,
    token: ""
};

export function userReducer(state = <IUserState> INITIAL_STATE, action: {type: string, id: string, avatar: string, token: string}){

    switch (action.type) {

        case USER.ADMIN: {

            let id = action.id;
            let avatar = action.avatar;
            let isLogin = true;
            let isAdmin = true;
            let token = action.token;

            return Object.assign({}, state, {id, avatar, isLogin, isAdmin, token});

        } case USER.LOGIN: {

            let id = action.id;
            let avatar = action.avatar;
            let isLogin = true;
            let isAdmin = false;
            let token = action.token;

            return Object.assign({}, state, {id, avatar, isLogin, isAdmin, token});

        } case USER.LOGOUT: {

            let id = "";
            let avatar = "";
            let isLogin = false;
            let isAdmin = false;
            let token = action.token;

            return Object.assign({}, state, {id, avatar, isLogin, isAdmin, token});

        } case USER.UPDATE_AVATAR: {

            let avatar = action.avatar;

            return Object.assign({}, state, {avatar});

        } default: {

            return state;

        }

    }

}