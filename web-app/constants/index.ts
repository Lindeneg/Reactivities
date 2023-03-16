const getEnvVarOrThrow = (name: string): string => {
    const value = getEnvVarOrNull(name);
    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
};

const getEnvVarOrNull = (name: string): string | null => {
    return process.env[name] || null;
};

const env = {
    REACTIVITY_API_URL: getEnvVarOrThrow('REACTIVITY_API_URL'),
    REACTIVITY_MODE: getEnvVarOrNull('REACTIVITY_MODE'),
} as const;

export default env;
