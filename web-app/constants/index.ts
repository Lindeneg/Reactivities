import { generatedlinks } from './generatedlinks';

export const ENV = {
    API_URL: process.env['NEXT_PUBLIC_REACTIVITY_API_URL'] || '',
    MODE: process.env['NEXT_PUBLIC_REACTIVITY_MODE'] || '',
    AUTH_COOKIE_NAME: process.env['NEXT_PUBLIC_REACTIVITY_AUTH_COOKIE_NAME'] || '',
} as const;

export const META_HEADER = {
    TITLE: 'Reactivities',
    DESCRIPTION: 'Create and organize events',
} as const;

export const AUTH_ERROR_RESPONSE_STATUSES = [401, 403];

export const AUTH_COOKIE_REGEX = new RegExp(`${ENV.AUTH_COOKIE_NAME}=(.+);?`);

export const APP_LINK = generatedlinks;
