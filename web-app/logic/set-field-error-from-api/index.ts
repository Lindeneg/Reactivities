import type { FormikHelpers } from 'formik';
import { CustomAxiosError } from '@/data/logic/handle-response';

type Overrides = Record<string, string> | null;

const getFieldFromRegex = <T>(values: T, code: string): string | null => {
    if (values !== null && typeof values === 'object') {
        const keys = Object.keys(values);
        for (const key of keys) {
            const re = new RegExp(key, 'i');
            if (re.test(code)) return key;
        }
    }

    return null;
};

const getFieldFromOverride = (overrides: Overrides, code: string): string | null => {
    if (!overrides) return null;

    const override = overrides[code];

    if (!override) return null;

    return override;
};

const getField = <T>(values: T, code: string, overrides: Overrides) => {
    if (overrides !== null) {
        return getFieldFromOverride(overrides, code);
    }
    return getFieldFromRegex(values, code);
};

const setFieldErrorFromApi = <T>(
    error: CustomAxiosError | null,
    values: T,
    setFieldError: FormikHelpers<T>['setFieldError'],
    overrides: Overrides = null
) => {
    if (!error) return false;

    const data = error.response?.data;
    let didSetError = false;

    if (Array.isArray(data)) {
        data.forEach((item) => {
            const field = getField(values, item.code, overrides);
            if (field) {
                setFieldError(field, item.description);
                didSetError = true;
            }
        });
    } else if (data?.errors) {
        Object.keys(data.errors).forEach((key) => {
            const msg = data.errors[key][0];
            const lowerKey = key.toLowerCase();
            if (msg && typeof values[lowerKey as keyof typeof values] !== 'undefined') {
                setFieldError(lowerKey.toLowerCase(), msg);
                didSetError = true;
            }
        });
    }

    return didSetError;
};

export default setFieldErrorFromApi;
