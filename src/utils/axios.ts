// src/utils/axios.ts
import axios from 'axios';

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BACKEND}/api`, // Thay bằng URL API của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm Interceptor để tự động gắn accessToken
instance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userToken = user?.accessToken;
        const staff = JSON.parse(localStorage.getItem('staff') || '{}');
        const staffToken = staff?.accessToken;
        // if (userToken) {
        //     config.headers.Authorization = `Bearer ${userToken} || ''`;
        // }
        // if (staffToken) {
        //     config.headers.Authorization = `Bearer ${staffToken} || ''`;
        // }
        const token = staffToken || userToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default instance;
