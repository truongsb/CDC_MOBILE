import configs from "../config/configs";
import authHeader from "./authHeader";
import axios from "axios";
export const VanTaiService = {
    loginBySdt,
    getDsVanTai,
    getInfoVanTaibyId,
    checkInVanTai,
    checkOutVanTai,
    getQrLuongXanh,
    importQRLuongXanh,
    getDanhSachDiemDen,
    getXaDiemDenTheoHuyen,
    importDataNoiTinh
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
async function getQrLuongXanh(id) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `https://vantai.drvn.gov.vn:8081/api/qr/getInfo?token=${id}`,
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// async function importQRLuongXanh(url_qr_xanh,  so_nguoi, xe_qua_canh) {
//   try {
//     return await axios({
//       method: "POST",
//       headers: authHeader(),
//       url: `${configs.apiUrl}/api/app-mobile/lay-thong-tin-luong-xanh`,
//       params: {
//         'url_qr_xanh': url_qr_xanh,
//         'so_nguoi': so_nguoi,
//         'xe_qua_canh': xe_qua_canh,
//       },
//     }).then((res) => {
//       return res.data;
//     });
//   } catch (error) {
//     console.log(error);
//     return handleError(error);
//   }
// }
///////////////////////////////////////////////////////////////////////////////////////
async function importQRLuongXanh(url_qr_xanh, so_nguoi, xe_qua_canh,token) {
  try {
    return await axios({
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: `${configs.apiUrl}/api/app-mobile/lay-thong-tin-luong-xanh`,
      params: {
        'url_qr_xanh': url_qr_xanh,
        'so_nguoi': so_nguoi,
        'xe_qua_canh': xe_qua_canh
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("error",error);
    return handleError(error);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getDanhSachDiemDen() {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${configs.apiUrl}/api/van-tai/danh-sach-diem-kiem-tra`,
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getXaDiemDenTheoHuyen(ma_huyen) {
  try {
      return await axios({
          method: 'Get',
          headers: authHeader(),
          url : `${configs.apiUrl}/api/common/danh-muc-xa`,
          params: {
              'ma_huyen' : ma_huyen
          }
      }).then((res) => {
          return res.data;
      })
  } catch (error) {
      return handleError(error);
  }
}
///////////////////////////////////////////////////////////////////////////////////////
async function importDataNoiTinh(ho_ten, so_dien_thoai, bien_so, so_nguoi, ma_chot,lst_diem_den, token) {
  try {
    return await axios({
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: `${configs.apiUrl}/api/khai-bao-noi-tinh`,
      data: {
        'ho_ten': ho_ten,
        'so_dien_thoai': so_dien_thoai,
        'bien_so': bien_so,
        'so_nguoi': so_nguoi,
        'ma_chot':ma_chot,
        'lst_diem_den': lst_diem_den
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("error",error);
    return handleError(error);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function handleError(error) {
  if (error.isAxiosError && error?.response?.status === 401) {
    // history.push('/login');
  }
  return Promise.reject(error);
}