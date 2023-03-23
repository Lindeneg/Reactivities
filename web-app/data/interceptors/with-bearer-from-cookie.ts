import type { AxiosInstance } from 'axios';
import constants from '@/constants';

const withBearerFromCookie = (axiosInstance: AxiosInstance): AxiosInstance => {
    axiosInstance.interceptors.request.use((config) => {
        const match = window.document.cookie.match(constants.AUTH_COOKIE_REGEX);
        config.headers.Authorization = `Bearer ${match ? match[1] : ''}`;

        return config;
    });

    return axiosInstance;
};

export default withBearerFromCookie;
