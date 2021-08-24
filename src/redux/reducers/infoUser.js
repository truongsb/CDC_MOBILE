import { userConstants } from "../constants";
const isLoginSuccess = false;
const initialState = {
    is_checkin: false,
    is_checkout: false,
    ma_diem_den: '',
    ma_nhan_vien_check: '',
    name: "",
    ten_chot: "",
    username: ""
}
export function login(state = isLoginSuccess, action) {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            return true;
        case userConstants.LOGOUT:
            return false;
        default:
            return state;
    }
}

export function infoLogin(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                is_checkin: action.payload.is_checkin,
                is_checkout: action.payload.is_checkout,
                ma_diem_den: action.payload.ma_diem_den,
                ma_nhan_vien_check: action.payload.ma_nhan_vien_check,
                name: action.payload.name,
                ten_chot: action.payload.ten_chot,
                username: action.payload.username
            };
        default:
            return state;
    }
}

