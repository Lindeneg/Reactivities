import axios from 'axios';
import constants from '@/constants';
import config from '@/data/config';
import handleResponse from '@/data/handle-response';
import setAuthCookie from '@/logic/set-auth-cookie';
import type { LoginDto } from '@/models/login-dto';

const axiosInstance = axios.create({
    ...config,
    baseURL: constants.ENV.NEXT_PUBLIC_REACTIVITY_API_URL + '/account',
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
