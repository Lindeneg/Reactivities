const ENV = {
    API_URL: process.env['NEXT_PUBLIC_REACTIVITY_API_URL'] || '',
    MODE: process.env['NEXT_PUBLIC_REACTIVITY_MODE'] || '',
    AUTH_COOKIE_NAME: process.env['NEXT_PUBLIC_REACTIVITY_AUTH_COOKIE_NAME'] || '',
} as const;

const META_HEADER = {
    TITLE: 'Reactivities',
    DESCRIPTION: 'Create and organize events',
} as const;

const AUTH_ERROR_RESPONSE_STATUSES = [401, 403];

const AUTH_COOKIE_REGEX = new RegExp(`${ENV.AUTH_COOKIE_NAME}=(.+);?`);

const constants = {
    ENV,
    META_HEADER,
    AUTH_COOKIE_REGEX,
    AUTH_ERROR_RESPONSE_STATUSES,
};

export default constants;
