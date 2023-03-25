import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { APP_LINK, AUTH_ERROR_RESPONSE_STATUSES, ENV } from '@/constants';
import api from '@/data/server';
import { User } from '@/models';

type ServerSideAuthHandler<T> = (
    data: User & { token: string },
    cxt: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<T>>;

async function extractAuthCookieAndUser<T>(handler: ServerSideAuthHandler<T>, cxt: GetServerSidePropsContext) {
    const token = cxt.req.cookies[ENV.AUTH_COOKIE_NAME];

    if (!token) {
        return {
            redirect: {
                destination: APP_LINK.ACCOUNT_LOGIN,
                permanent: false,
            },
        };
    }

    const { response, error } = await api.auth.getCurrentUser(token);

    if (!response?.data) {
        return {
            redirect: {
                destination: APP_LINK.N500,
                permanent: false,
            },
        };
    }

    if (AUTH_ERROR_RESPONSE_STATUSES.includes(error?.response?.status || -1)) {
        return {
            redirect: {
                destination: '/' + error?.response?.status,
                permanent: false,
            },
        };
    }

    return handler({ ...response.data, token }, cxt);
}

const withMustBeAuthenticated = <T>(handler: ServerSideAuthHandler<T>) => extractAuthCookieAndUser.bind(null, handler);

export default withMustBeAuthenticated;
