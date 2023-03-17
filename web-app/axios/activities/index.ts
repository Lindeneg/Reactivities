import axios from 'axios';
import constants from '@/constants';
import type { Activity, BaseActivity } from '@/models/activity';
import config from '../config';

const axiosInstance = axios.create({
    ...config,
    baseURL: constants.REACTIVITY_API_URL + '/activities',
});

const api = {
    getActivities: () => axiosInstance.get<Activity[]>('/'),

    getActivity: (id: Activity['id']) => axiosInstance.get<Activity>(`/${id}`),

    createActivity: (activity: BaseActivity) => axiosInstance.post('/', activity),

    updateActivity: (id: Activity['id'], activity: Partial<BaseActivity>) => axiosInstance.put(`/${id}`, activity),

    deleteActivity: (id: Activity['id']) => axiosInstance.delete(`/${id}`),
} as const;

export default api;
