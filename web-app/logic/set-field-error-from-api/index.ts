import type { FormikHelpers } from 'formik';
import { CustomAxiosError } from '@/data/logic/handle-response';

const setFieldErrorFromApi = <T>(
    error: CustomAxiosError | null,
    values: T,
    setFieldError: FormikHelpers<T>['setFieldError'],
    override?: () => void
) => {
    if (!error) return false;

    const errors = error.response?.data.errors || {};
    const overrideErrors = (error.response?.data as any)[0];
    let didSetError = false;

    if (overrideErrors && typeof override !== 'undefined') {
        if (overrideErrors.code === 'PasswordTooShort') {
            setFieldError('password', overrideErrors.description);
            didSetError = true;
        } else if (overrideErrors.code === 'DuplicateEmail') {
            setFieldError('email', overrideErrors.description);
            didSetError = true;
        }
    } else {
        Object.keys(errors).forEach((key) => {
            console.log(errors[key]);
            const msg = errors[key][0];
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
