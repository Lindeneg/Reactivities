import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import constants from '@/constants';
import api from '@/data/server';
import { User } from '@/models';

type ServerSideAuthHandler<T> = (
    data: User & { token: string },
    cxt: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<T>>;

async function extractAuthCookieAndUser<T>(handler: ServerSideAuthHandler<T>, cxt: GetServerSidePropsContext) {
    const token = cxt.req.cookies[constants.ENV.AUTH_COOKIE_NAME];

    if (!token) {
        return {
            redirect: {
                destination: '/account/login',
                permanent: false,
            },
        };
    }

    const { response, error } = await api.auth.getCurrentUser(token);

    if (!response?.data) {
        return {
            redirect: {
                destination: '/500',
                permanent: false,
            },
        };
    }

    if (constants.AUTH_ERROR_RESPONSE_STATUSES.includes(error?.response?.status || -1)) {
        return {
            redirect: {
                destination: '/' + error?.response?.status,
                permanent: false,
            },
        };
    }

    return handler({ ...response.data, token }, cxt);
}

const withServerSideAuth = <T>(handler: ServerSideAuthHandler<T>) => extractAuthCookieAndUser.bind(null, handler);

export default withServerSideAuth;
