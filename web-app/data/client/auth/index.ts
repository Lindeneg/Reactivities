import axios from 'axios';
import communicator from '@/communicator';
import { ENV } from '@/constants';
import config from '@/data/config';
import handleResponse from '@/data/logic/handle-response';
import setAuthCookie from '@/data/logic/set-auth-cookie';
import type { LoginDto, UserWithToken } from '@/models';

const axiosInstance = axios.create({
    ...config,
    baseURL: ENV.API_URL + '/account',
});

const auth = {
    login: handleResponse({
        callback: async (data: LoginDto) => {
            const response = await axiosInstance.post<UserWithToken>('/login', data);

            setAuthCookie(response.data.token);

            return response;
        },
        onError: () => {
            communicator.publish('enqueue-snackbar', {
                msg: 'Failed to login',
                variant: 'error',
            });
        },
    }),
} as const;

export default auth;
