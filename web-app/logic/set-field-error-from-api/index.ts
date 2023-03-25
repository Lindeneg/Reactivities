import type { FormikHelpers } from 'formik';
import { CustomAxiosError } from '@/data/logic/handle-response';

const setFieldErrorFromApi = <T>(
    error: CustomAxiosError | null,
    values: T,
    setFieldError: FormikHelpers<T>['setFieldError']
) => {
    if (!error) return false;

    const errors = error.response?.data.errors || {};
    let didSetError = false;

    Object.keys(errors).forEach((key) => {
        const msg = errors[key][0];
        const lowerKey = key.toLowerCase();
        if (msg && typeof values[lowerKey as keyof typeof values] !== 'undefined') {
            setFieldError(lowerKey.toLowerCase(), msg);
            didSetError = true;
        }
    });

    return didSetError;
};

export default setFieldErrorFromApi;
