import { action } from "typesafe-actions";
import { Constants } from "./constants";

export function runActionUserLogin(id: string, avatar: string, token: string): { type: Constants.LOGIN; payload: { id: string; avatar: string; token: string } } {
    return action(Constants.LOGIN, { id, avatar, token});
}

export function runActionUserLogout(): { type: Constants.LOGOUT; payload: {} }{
    return action(Constants.LOGOUT, {});
}

export function runActionUserAdmin(id: string, avatar: string, token: string): { type: Constants.ADMIN; payload: { id: string; avatar: string; token: string } } {
    return action(Constants.ADMIN, {id, avatar, token});
}

export function runActionUserUpdateAvatar(avatar: string, token: string): { type: Constants.UPDATE_AVATAR; payload: { avatar: string; token: string } } {
    return action(Constants.UPDATE_AVATAR, {avatar, token});
}