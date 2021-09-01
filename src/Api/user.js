import configs from "../config/configs";
import authHeader from "./authHeader";
import axios from "axios";
export const userService = {
    login
  };

  async function login (username, password){
    try {
        return await axios({
            method: 'Post',
            headers: authHeader(),
            url : `${configs.apiUrl}/api/nhan-vien/login`,
            params: {
                'username' : username,
                'password': password
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}
  function handleError(error) {
    if (error.isAxiosError && error?.response?.status === 401) {
      // history.push('/login');
    }
    return Promise.reject(error);
  }