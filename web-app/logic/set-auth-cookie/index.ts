const setAuthCookie = (token: string) => {
    const expires = 7 * 24 * 60 * 60 * 1000;
    const cookieExpire = new Date(Date.now() + expires);

    document.cookie = `reactivities-token=${token}; Max-Age=${
        expires / 1000
    }; Path=/; Expires=${cookieExpire}; SameSite=Strict`;
};

export default setAuthCookie;
