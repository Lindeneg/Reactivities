const ENV = {
    NEXT_PUBLIC_REACTIVITY_API_URL: process.env['NEXT_PUBLIC_REACTIVITY_API_URL'] || '',
    REACTIVITY_MODE: process.env['REACTIVITY_MODE'] || '',
} as const;

const META_HEADER = {
    TITLE: 'Reactivities',
    DESCRIPTION: 'Create and organize events',
} as const;

const AUTH_ERROR_STATUS = [401, 403];

const AUTH_COOKIE_NAME = 'reactivities-token';
const AUTH_COOKIE_REGEX = /reactivities-token=(.+);?/;

const constants = {
    ENV,
    META_HEADER,
    AUTH_ERROR_STATUS,
    AUTH_COOKIE_NAME,
    AUTH_COOKIE_REGEX,
};

export default constants;
