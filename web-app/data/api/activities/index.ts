import axios from 'axios';
import constants from '@/constants';
import type { Activity, BaseActivity } from '@/models/activity';
import communicator from '@/utils/communicator';
import config from '../config';

const axiosInstance = axios.create({
    ...config,
    baseURL: constants.NEXT_PUBLIC_REACTIVITY_API_URL + '/activities',
});

const activities = {
    getAll: () => axiosInstance.get<Activity[]>('/'),

    get: (id: Activity['id']) => axiosInstance.get<Activity>(`/${id}`),

    create: async (activity: BaseActivity) => {
        try {
            const { data } = await axiosInstance.post<string>('/', activity);

            communicator.publish('created-activity', {
                activity: {
                    ...activity,
                    id: data,
                },
            });

            communicator.publish('enqueue-snackbar', {
                msg: `Successfully create activity: '${activity.title}'`,
                variant: 'success',
            });
        } catch (err) {
            communicator.publish('enqueue-snackbar', {
                msg: `Failed to create activity: '${activity.title}'`,
                variant: 'error',
            });
        }
    },

    update: async (id: Activity['id'], activity: BaseActivity) => {
        try {
            await axiosInstance.put<void>(`/${id}`, activity);

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
        } catch (err) {
            communicator.publish('enqueue-snackbar', {
                msg: `Failed to update activity: '${activity.title}'`,
                variant: 'error',
            });
        }
    },

    delete: async (id: Activity['id'], title?: Activity['title']) => {
        const msgTitle = title ? `: '${title}'` : '';

        communicator.publish('set-global-spinner-state', { open: true });

        try {
            await axiosInstance.delete<void>(`/${id}`);

            communicator.publish('deleted-activity', { activityId: id });

            communicator.publish('enqueue-snackbar', {
                msg: 'Successfully deleted activity' + msgTitle,
                variant: 'success',
            });
        } catch (err) {
            communicator.publish('enqueue-snackbar', {
                msg: 'Failed to delete activity' + msgTitle,
                variant: 'error',
            });
        }

        communicator.publish('set-global-spinner-state', { open: false });
    },
} as const;

export default activities;
