import axios from 'axios';
import constants from '@/constants';
import config from '@/data/config';
import handleResponse from '@/logic/handle-response';
import type { Activity } from '@/models/activity';

const axiosInstance = axios.create({
    ...config,
    baseURL: constants.ENV.NEXT_PUBLIC_REACTIVITY_API_URL + '/activities',
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
