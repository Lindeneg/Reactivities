const ENV = {
    NEXT_PUBLIC_REACTIVITY_API_URL: process.env['NEXT_PUBLIC_REACTIVITY_API_URL'] || '',
    REACTIVITY_MODE: process.env['REACTIVITY_MODE'] || '',
} as const;

const META_HEADER = {
    TITLE: 'Reactivities',
    DESCRIPTION: 'Create and organize events',
} as const;

const constants = {
    ENV,
    META_HEADER,
};

export default constants;
