import configs from "../config/configs";
import authHeader from "./authHeader";
import axios from "axios";
export const VanTaiService = {
    loginBySdt,
    getDsVanTai,
    getInfoVanTaibyId,
  };
///////////////////////////////////////////////////////////////////////////////////////
async function loginBySdt(sdt) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${configs.apiUrl}/api/app-mobile/login-by-sdt`,
      params: {
        'username' : sdt,
        }
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}
///////////////////////////////////////////////////////////////////////////////////////
async function getDsVanTai(sdt,ma_diem_den) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${configs.apiUrl}/api/app-mobile/get-danh-sach`,
      params: {
        'username' : sdt,
        'ma_diem_den' : ma_diem_den,
        }
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}
///////////////////////////////////////////////////////////////////////////////////////
async function getInfoVanTaibyId(ma_to_khai_van_tai) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${configs.apiUrl}/api/van-tai/get-to-khai-van-tai`,
      params: {
        'ma_to_khai_van_tai' : ma_to_khai_van_tai,
        }
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function handleError(error) {
    if (error.isAxiosError && error.response.status === 401) {
      // history.push('/login');
    }
    return Promise.reject(error);
  }