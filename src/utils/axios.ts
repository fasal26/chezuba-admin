/**
 * @description Axios HTTP Handler Utility
 * @author Fasal
*/

import axios from 'axios'

let http = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
   headers: {
      'Content-Type': 'application/json; charset=utf-8',
   },
   withCredentials: false
})

http.interceptors.request.use((req) => {
   const token = 'todo'
   if (token && req.headers) req.headers['Authorization'] = token;
    return req;
 }, (error) => {
    return Promise.reject(error);
 });

http.interceptors.response.use(async res => {
    // const store = useAuthStore()
    let data = res.data
    if (data && data.status === 2000) {
      // store.clearToken()
      window.location.replace("login")
    } else {
        return data
    }
 }, error => {
    if (error.response) {
        console.error('Response: ', error.response.data)
        console.error('Status: ', error.response.status)
        console.error('Headers: ', error.response.headers)
    } else {
        console.error('Error: ', error.message)
    }
    console.log(error.config);
    return Promise.reject(error);
});

 export default http