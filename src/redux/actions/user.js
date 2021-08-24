import { userConstants } from "../constants"
export const loginSuccess = () => {
    return {
        type: userConstants.LOGIN_SUCCESS,
    }
}

export const logout = () => {
    return {
        type: userConstants.LOGOUT,
    }
}

export const setInfoLogin = (info) => {
    return {
        type: userConstants.REGISTER_SUCCESS,
        payload: info
    }
}