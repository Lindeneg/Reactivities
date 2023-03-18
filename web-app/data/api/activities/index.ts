import axios from 'axios';
import constants from '@/constants';
import type { Activity, BaseActivity } from '@/models/activity';
import config from '../config';

const axiosInstance = axios.create({
    ...config,
    baseURL: constants.NEXT_PUBLIC_REACTIVITY_API_URL + '/activities',
});

const activities = {
    getAll: () => axiosInstance.get<Activity[]>('/'),

    get: (id: Activity['id']) => axiosInstance.get<Activity>(`/${id}`),

    create: (activity: BaseActivity) => axiosInstance.post<string>('/', activity),

    update: (id: Activity['id'], activity: Partial<BaseActivity>) => axiosInstance.put<void>(`/${id}`, activity),

    delete: (id: Activity['id']) => axiosInstance.delete<void>(`/${id}`),
} as const;

export default activities;
