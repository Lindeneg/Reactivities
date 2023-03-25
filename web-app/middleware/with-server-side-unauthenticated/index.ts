import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import constants from '@/constants';
import api from '@/data/server';

type ServerSideUnauthenticatedHandler<T> = (cxt: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>>;

async function redirectToDashboardIfUserIsLoggedIn<T>(
    handler: ServerSideUnauthenticatedHandler<T>,
    cxt: GetServerSidePropsContext
) {
    const token = cxt.req.cookies[constants.ENV.AUTH_COOKIE_NAME];

    if (token) {
        const { error } = await api.auth.getCurrentUser(token);
        if (!error) {
            return {
                redirect: {
                    destination: '/activities',
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
