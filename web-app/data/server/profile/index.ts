import axios from 'axios';
import { ENV } from '@/constants';
import config from '@/data/config';
import handleResponse from '@/data/logic/handle-response';
import { User } from '@/models';

const axiosInstance = axios.create({
    ...config,
    baseURL: ENV.API_URL + '/profiles',
});

const auth = {
    getProfile: handleResponse({
        callback: (username: string, token: string) =>
            axiosInstance.get<User>(`${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
    }),
} as const;

export default auth;
