import axios from 'axios';
import communicator from '@/communicator';
import { ENV } from '@/constants';
import config from '@/data/config';
import withBearerFromCookie from '@/data/interceptors/with-bearer-from-cookie';
import handleResponse from '@/data/logic/handle-response';
import type { Activity, BaseActivity } from '@/models';

const axiosInstance = withBearerFromCookie(
    axios.create({
        ...config,
        baseURL: ENV.API_URL + '/activities',
    })
);

const activities = {
    create: handleResponse({
        callback: async (activity: BaseActivity) => {
            const response = await axiosInstance.post<string>('/', {
                ...activity,
                date: activity.date.toISOString(),
            });

            communicator.publish('created-activity', {
                activity: {
                    ...activity,
                    id: response.data,
                },
            });

            communicator.publish('enqueue-snackbar', {
                msg: `Successfully created activity: '${activity.title}'`,
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
            const response = await axiosInstance.put<void>(`/${id}`, {
                ...activity,
                date: activity.date.toISOString(),
            });

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

    attend: handleResponse({
        callback: async (activity: Activity, isHost: boolean) => {
            const response = await axiosInstance.post<void>(`/${activity.id}/attend`);

            if (isHost) {
                communicator.publish('updated-activity-state', {
                    activityId: activity.id,
                    isCancelled: !activity.isCancelled,
                });

                communicator.publish('enqueue-snackbar', {
                    msg: `Successfully ${activity.isCancelled ? 'revived' : 'cancelled'} activity: '${activity.title}'`,
                    variant: 'success',
                });
            } else {
                communicator.publish('updated-activity-attendance', {
                    activityId: activity.id,
                });

                communicator.publish('enqueue-snackbar', {
                    msg: `Successfully updated attendance on activity: '${activity.title}'`,
                    variant: 'success',
                });
            }

            return response;
        },
        onError: (_, activity) => {
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
                msg: 'Successfully deleted activity' + (title ? `: '${title}'` : ''),
                variant: 'success',
            });

            return response;
        },
        onError: (_, __, title) => {
            communicator.publish('enqueue-snackbar', {
                msg: 'Failed to delete activity' + (title ? `: '${title}'` : ''),
                variant: 'error',
            });
        },
        onDone: () => {
            communicator.publish('set-global-spinner-state', { open: false });
        },
    }),
} as const;

export default activities;
