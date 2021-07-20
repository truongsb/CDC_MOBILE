export function authHeader() {
    // return authorization header with jwt token
    //let user = JSON.parse(localStorage.getItem("user"));
    return { 'Content-Type': 'application/json; charset=utf-8' };
    // if (user && user.token) {
    //   return {
    //     'Authorization': 'Bearer ' + user.token,
    //     'Content-Type': 'application/json; charset=utf-8',
    //   };
    // } else {
    //   return { 'Content-Type': 'application/json; charset=utf-8' };
    // }
  }
  
  export default authHeader;
  