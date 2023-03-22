import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import api from '@/data/server';
import { User } from '@/models/user';

export type ServerSideAuthHandler<T> = (data: User & { token: string }) => Promise<GetServerSidePropsResult<T>>;

export async function withServerSideAuth<T>(cxt: GetServerSidePropsContext, handler: ServerSideAuthHandler<T>) {
    const token = cxt.req.cookies['reactivities-token'];

    if (!token) {
        return {
            redirect: {
                destination: '/403',
                permanent: false,
            },
        };
    }

    const { response, error } = await api.auth.getCurrentUser(token);

    console.log(response, error);

    if (!response?.data) {
        return {
            redirect: {
                destination: '/500',
                permanent: false,
            },
        };
    }

    if ([401, 403].includes(error?.response?.status || -1)) {
        return {
            redirect: {
                destination: '/401',
                permanent: false,
            },
        };
    }

    return handler({ ...response.data, token });
}
