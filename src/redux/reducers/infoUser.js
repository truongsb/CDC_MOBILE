import { userConstants } from "../constants";
const isLoginSuccess = false;
const initialState = {
    is_checkin: false,
    is_checkout: false,
    ma_diem_den: '0',
    ma_nhan_vien_check: '0',
    name: "0",
    ten_chot: "",
    username: "0"
}
const initialStateUserlogin = {
    is_chot: false,
    token: '',
    ten_chot: "",
    ma_chot:'',
    ma_nhan_vien_kc: ''
}
const urlQrLuongXanhVanTai= {
    id_qr: '',
    loai_qr: ''
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

export function infoLogin(state = initialStateUserlogin, action) {
    switch (action.type) {
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                ten_chot: action.payload.ten_chot,
                is_chot: action.payload.is_chot,
                token: action.payload.token,
                ma_chot:action.payload.ma_chot,
                ma_nhan_vien_kc:action.payload.ma_nhan_vien_kc
            };
        default:
            return state;
    }
}

export function setUrlQRVanTai(state = urlQrLuongXanhVanTai, action) {
    console.log(action.type);
    switch (action.type) {
        case 'GET_SUCCESS':
            return action.payload;
        case 'RESET_QR':
            return {
                id_qr: '',
                loai_qr: ''
            };
        default:
            return state;
    }
}
