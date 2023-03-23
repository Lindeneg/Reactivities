import axios from 'axios';
import constants from '@/constants';
import config from '@/data/config';
import handleResponse from '@/data/logic/handle-response';
import { User } from '@/models/user';

const axiosInstance = axios.create({
    ...config,
    baseURL: constants.ENV.API_URL + '/account',
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
