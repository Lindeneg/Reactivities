import axios from 'axios';
import constants from '@/constants';
import type { Activity, BaseActivity } from '@/models/activity';

const axiosInstance = axios.create({
    baseURL: constants.REACTIVITY_API_URL + '/activities',
    timeout: 8000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

const api = {
    getActivities: () => axiosInstance.get<Activity[]>('/'),

    getActivity: (id: Activity['id']) => axiosInstance.get<Activity>(`/${id}`),

    createActivity: (activity: BaseActivity) => axiosInstance.post('/', activity),

    updateActivity: (id: Activity['id'], activity: Partial<BaseActivity>) => axiosInstance.put(`/${id}`, activity),

    deleteActivity: (id: Activity['id']) => axiosInstance.delete(`/${id}`),
} as const;

export default api;
