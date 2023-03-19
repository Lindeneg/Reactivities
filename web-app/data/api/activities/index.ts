import axios, { type AxiosError, type AxiosResponse } from 'axios';
import communicator from '@/communicator';
import constants from '@/constants';
import type { Activity, BaseActivity } from '@/models/activity';
import config from '../config';

const axiosInstance = axios.create({
    ...config,
    baseURL: constants.ENV.NEXT_PUBLIC_REACTIVITY_API_URL + '/activities',
});

type APIResult<TReturn> = Promise<{
    response: AxiosResponse<TReturn> | null;
    error: AxiosError | null;
}>;

const activities = {
    getAll: () => axiosInstance.get<Activity[]>('/'),

    get: (id: Activity['id']) => axiosInstance.get<Activity>(`/${id}`),

    create: async (activity: BaseActivity): APIResult<string> => {
        try {
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

            return {
                response,
                error: null,
            };
        } catch (err) {
            communicator.publish('enqueue-snackbar', {
                msg: `Failed to create activity: '${activity.title}'`,
                variant: 'error',
            });

            return {
                response: null,
                error: err as AxiosError,
            };
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
