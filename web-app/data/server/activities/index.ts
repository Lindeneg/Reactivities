import axios from 'axios';
import { ENV } from '@/constants';
import config from '@/data/config';
import handleResponse from '@/data/logic/handle-response';
import type { Activity } from '@/models/activity';

const axiosInstance = axios.create({
    ...config,
    baseURL: ENV.API_URL + '/activities',
});

const activities = {
    getAll: handleResponse({
        callback: (token: string) =>
            axiosInstance.get<Activity[]>('/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
    }),

    get: handleResponse({
        callback: (id: Activity['id'], token: string) =>
            axiosInstance.get<Activity>(`/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
    }),
} as const;

export default activities;
