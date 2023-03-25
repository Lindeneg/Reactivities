import axios from 'axios';
import { ENV } from '@/constants';
import config from '@/data/config';
import handleResponse from '@/data/logic/handle-response';
import { User } from '@/models';

const axiosInstance = axios.create({
    ...config,
    baseURL: ENV.API_URL + '/account',
});

const auth = {
    getCurrentUser: handleResponse({
        callback: (token: string) =>
            axiosInstance.get<User>('/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
    }),
} as const;

export default auth;
