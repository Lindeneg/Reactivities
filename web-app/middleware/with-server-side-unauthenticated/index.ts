import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { APP_LINK, ENV } from '@/constants';
import api from '@/data/server';

type ServerSideUnauthenticatedHandler<T> = (cxt: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>>;

async function redirectToDashboardIfUserIsLoggedIn<T>(
    handler: ServerSideUnauthenticatedHandler<T>,
    cxt: GetServerSidePropsContext
) {
    const token = cxt.req.cookies[ENV.AUTH_COOKIE_NAME];

    if (token) {
        const { error } = await api.auth.getCurrentUser(token);
        if (!error) {
            return {
                redirect: {
                    destination: APP_LINK.ROOT,
                    permanent: false,
                },
            };
        }
    }

    return handler(cxt);
}

const withServerSideUnauthenticated = <T>(handler: ServerSideUnauthenticatedHandler<T>) =>
    redirectToDashboardIfUserIsLoggedIn.bind(null, handler);

export default withServerSideUnauthenticated;
