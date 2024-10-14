import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://localhost:3001/api', // URL của backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosConfig;
