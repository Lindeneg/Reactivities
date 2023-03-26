import { ENV } from '@/constants';

const createCookieString = (token: string, expires: number) => {
    const cookieExpire = new Date(Date.now() + expires);

    return `${ENV.AUTH_COOKIE_NAME}=${token}; Max-Age=${
        expires / 1000
    }; Path=/; Expires=${cookieExpire}; SameSite=Strict; Secure=${ENV.MODE === 'prod'}`;
};

export default createCookieString;
