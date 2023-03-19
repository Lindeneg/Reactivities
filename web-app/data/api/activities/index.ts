import axios from 'axios';
import communicator from '@/communicator';
import constants from '@/constants';
import type { Activity, BaseActivity } from '@/models/activity';
import config from '../config';
import handleResponse from '../handle-response';

const axiosInstance = axios.create({
    ...config,
    baseURL: constants.ENV.NEXT_PUBLIC_REACTIVITY_API_URL + '/activities',
});

const activities = {
    getAll: handleResponse({
        callback: () => axiosInstance.get<Activity[]>('/'),
    }),

    get: handleResponse({
        callback: (id: Activity['id']) => axiosInstance.get<Activity>(`/${id}`),
    }),

    create: handleResponse({
        callback: async (activity: BaseActivity) => {
            const response = await axiosInstance.post<string>('/', activity);

            communicator.publish('created-activity', {
                activity: {
                    ...activity,
                    id: response.data,
                },
            });

            communicator.publish('enqueue-snackbar', {
                msg: `Successfully create activity: '${activity.title}'`,
                variant: 'success',
            });

            return response;
        },
        onError: (_, activity) => {
            communicator.publish('enqueue-snackbar', {
                msg: `Failed to create activity: '${activity.title}'`,
                variant: 'error',
            });
        },
    }),

    update: handleResponse({
        callback: async (id: Activity['id'], activity: BaseActivity) => {
            const response = await axiosInstance.put<void>(`/${id}`, activity);

            communicator.publish('updated-activity', {
                activity: {
                    ...activity,
                    id,
                },
            });

            communicator.publish('enqueue-snackbar', {
                msg: `Successfully updated activity: '${activity.title}'`,
                variant: 'success',
            });

            return response;
        },
        onError: (_, __, activity) => {
            communicator.publish('enqueue-snackbar', {
                msg: `Failed to update activity: '${activity.title}'`,
                variant: 'error',
            });
        },
    }),

    delete: handleResponse({
        callback: async (id: Activity['id'], title?: Activity['title']) => {
            communicator.publish('set-global-spinner-state', { open: true });

            const response = await axiosInstance.delete<void>(`/${id}`);

            communicator.publish('deleted-activity', { activityId: id });

            communicator.publish('enqueue-snackbar', {
                msg: 'Successfully deleted activity' + title ? `: '${title}'` : '',
                variant: 'success',
            });

            return response;
        },
        onError: (_, __, title) => {
            communicator.publish('enqueue-snackbar', {
                msg: 'Failed to delete activity' + title ? `: '${title}'` : '',
                variant: 'error',
            });
        },
        onDone: () => {
            communicator.publish('set-global-spinner-state', { open: false });
        },
    }),
} as const;

export default activities;
