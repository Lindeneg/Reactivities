import createCookieString from '@/logic/create-cookie-string';

const setAuthCookie = (token: string) => {
    const expires = 7 * 24 * 60 * 60 * 1000;

    document.cookie = createCookieString(token, expires);
};

export default setAuthCookie;
