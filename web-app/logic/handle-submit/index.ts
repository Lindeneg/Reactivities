import type { FormikHelpers } from 'formik';
import { APIResult } from '@/data/logic/handle-response';
import setFieldErrorFromApi from '../set-field-error-from-api';

const handleSubmit = async <TValues, TApiCall extends (values: TValues) => APIResult<unknown>>(
    api: TApiCall,
    onSuccess: () => void,
    values: TValues,
    helpers: FormikHelpers<TValues>
) => {
    const { error } = await api(values);

    const didSetError = setFieldErrorFromApi(error, values, helpers.setFieldError);

    if (!didSetError) onSuccess();
};

export default handleSubmit;
