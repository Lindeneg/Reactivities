import axios from 'axios';
import constants from '@/constants';
import config from '@/data/config';
import handleResponse from '@/data/logic/handle-response';
import setAuthCookie from '@/data/logic/set-auth-cookie';
import type { LoginDto } from '@/models/login-dto';

const axiosInstance = axios.create({
    ...config,
    baseURL: constants.ENV.API_URL + '/account',
});

const auth = {
    login: handleResponse({
        callback: async (data: LoginDto) => {
            const response = await axiosInstance.post('/login', data);

            setAuthCookie(response.data.token);

            return response;
        },
    }),
} as const;

export default auth;
