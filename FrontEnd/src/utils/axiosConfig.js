import axios from 'axios';
import { toast } from 'react-toastify';
import { createBrowserHistory } from 'history';
import Cookies from 'js-cookie';
const BASE_URL =`${process.env.REACT_APP_API_KEY}`
const axiosConfig = axios.create({
    baseURL: BASE_URL,
});
// const axiosConfigNoRegister = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });

axiosConfig.interceptors.response.use(response => {
    return response;
}, async(error) => {
    if (error.response.status === 401) {
    // localStorage.removeItem('token');
        Cookies.remove('token')
        Cookies.remove('permissions')
        Cookies.remove('user')
        createBrowserHistory().push('/login');
        window.location.reload();
        toast.error('Account Opened From Other Device. Please Login Again')
    }
    return Promise.reject(error)
});
export {axiosConfig };