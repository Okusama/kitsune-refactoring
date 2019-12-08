import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export interface IUserState {
    id: string,
    avatar: string,
    isAdmin: boolean,
    isLogin: boolean,
    token: string
}

export type UserActions = ActionType<typeof actions>