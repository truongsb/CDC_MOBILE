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

export const setUrlQRXanh = (url) => {
    return {
        type: 'GET_SUCCESS',
        payload: url
    }
}

export const resetUrlQRXanh = () => {
    return {
        type: 'RESET_QR',
    }
}