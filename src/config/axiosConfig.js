import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: `${import.meta.env.VITE_API_BACKEND}/api`, // URL của backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosConfig;
