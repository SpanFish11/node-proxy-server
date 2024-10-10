import axios from 'axios';
import config from './config.js';

const axiosInstance = axios.create({
    baseURL: config.apiUrl,
});

axiosInstance.interceptors.request.use(axiosRequestConfig => {
    const params = axiosRequestConfig.params || {};

    if (axiosRequestConfig.url.startsWith('/neo')) {
        params['api_key'] = config.apiKey;
    }

    axiosRequestConfig.params = params;

    return axiosRequestConfig;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;