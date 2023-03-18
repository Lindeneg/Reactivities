const env = {
    NEXT_PUBLIC_REACTIVITY_API_URL: process.env['NEXT_PUBLIC_REACTIVITY_API_URL'] || '',
    REACTIVITY_MODE: process.env['REACTIVITY_MODE'] || '',
} as const;

export default env;
