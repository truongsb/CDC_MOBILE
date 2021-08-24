import configs from "../config/configs";
import authHeader from "./authHeader";
import axios from "axios";
export const VanTaiService = {
    loginBySdt,
    getDsVanTai,
    getInfoVanTaibyId,
    checkInVanTai,
    checkOutVanTai,
  };
///////////////////////////////////////////////////////////////////////////////////////
async function loginBySdt(sdt) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${configs.apiUrl}/api/app-mobile/login-by-sdt`,
      params: {
        'username': sdt,
      }
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}
///////////////////////////////////////////////////////////////////////////////////////
async function getDsVanTai(sdt, ma_diem_den) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${configs.apiUrl}/api/app-mobile/get-danh-sach`,
      params: {
        'username': sdt,
        'ma_diem_den': ma_diem_den,
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
      url: `${configs.apiUrl}/api/app-mobile/get-to-khai-van-tai`,
      params: {
        'ma_to_khai_van_tai': ma_to_khai_van_tai,
      }
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}
///////////////////////////////////////////////////////////////////////////////////////
async function checkInVanTai(ma_to_khai_van_tai, ma_diem_den, nguoi_check_in) {
  try {
    return await axios({
      method: "POST",
      headers: authHeader(),
      url: `${configs.apiUrl}/api/app-mobile/check-in-diem-den`,
      params: {
        'ma_to_khai_van_tai': ma_to_khai_van_tai,
        'ma_diem_den': ma_diem_den,
        'nguoi_check_in': nguoi_check_in
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

//   try {
//     return await axios({
//       method: "POST",
//       headers: authHeader(),
//       url: `${configs.apiUrl}/api/app-mobile/check-in-diem-den`,
//       params: {
//           'ma_to_khai_van_tai': ma_to_khai_van_tai,
//           'ma_diem_den': ma_diem_den,
//           'nguoi_check_in': nguoi_check_in
//       }
//     }).then((res) => {
//       return res.data;
//     });
//   } catch (error) {
//     return handleError(error);
//   }
// }
///////////////////////////////////////////////////////////////////////////////////////
async function checkOutVanTai(ma_to_khai_van_tai,  nguoi_check_out) {
  try {
    return await axios({
      method: "POST",
      headers: authHeader(),
      url: `${configs.apiUrl}/api/app-mobile/check-out-tinh`,
      params: {
        'ma_to_khai_van_tai': ma_to_khai_van_tai,
        'nguoi_check_out': nguoi_check_out,
      },
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