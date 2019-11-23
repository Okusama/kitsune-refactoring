import { USER } from "./constants";

/*User Action*/
export function runActionUserLogin(id: string, avatar: string, token: string): {type: string, id: string, avatar: string, token: string} {
    return {type: USER.LOGIN, id, avatar, token};
}

export function runActionUserLogout(): {type: string} {
    return {type: USER.LOGOUT};
}

export function runActionUserAdmin(id: string, avatar: string, token: string): {type: string, id: string, avatar: string, token: string} {
    return {type: USER.ADMIN, id, avatar, token};
}

export function runActionUserUpdateAvatar(avatar: string, token: string): {type: string, avatar: string, token: string} {
    return {type: USER.UPDATE_AVATAR, avatar, token}
}