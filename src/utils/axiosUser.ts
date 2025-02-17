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
        console.log('user: ', user);
        const userToken = user?.accessToken;
        if (userToken) {
            config.headers.Authorization = `Bearer ${userToken} || ''`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default instance;
