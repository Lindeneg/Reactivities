import axios from 'axios';
import constants from '@/constants';
import config from '@/data/config';
import handleResponse from '@/logic/handle-response';
import type { LoginDto } from '@/models/login-dto';

const axiosInstance = axios.create({
    ...config,
    baseURL: constants.ENV.NEXT_PUBLIC_REACTIVITY_API_URL + '/account',
});

axiosInstance.interceptors.request.use((config) => {
    const match = window.document.cookie.match(/reactivities-token=(.+);?/);
    config.headers.Authorization = `Bearer ${match ? match[1] : ''}`;

    return config;
});

const auth = {
    login: handleResponse({
        callback: async (data: LoginDto) => {
            const response = await axiosInstance.post('/login', data);

            const maxAge = 7 * 24 * 60 * 60 * 1000;
            const cookieExpire = new Date(Date.now() + maxAge);

            document.cookie = `reactivities-token=${response.data.token}; Max-Age=${
                maxAge / 1000
            }; Path=/; Expires=${cookieExpire}; SameSite=Strict`;

            return response;
        },
    }),
} as const;

export default auth;
