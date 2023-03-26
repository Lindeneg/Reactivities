import type { AxiosError, AxiosResponse } from 'axios';

export type CustomAxiosError = AxiosError<
    { errors: Record<string, string[]> } | Array<{ code: string; description: string }>
>;

export type APIResult<TReturn> = Promise<{
    response: AxiosResponse<TReturn> | null;
    error: CustomAxiosError | null;
}>;

type HandleResponseOpts<TResponse, TArgs extends unknown[]> = {
    callback: (...args: TArgs) => Promise<NonNullable<Awaited<APIResult<TResponse>>['response']>>;
    // if TArgs are not destructured, the parameter names
    // for the caller will be what is implemented in onError or onDone instead of callback
    onError?: (err: AxiosError, ...args: [...TArgs]) => Promise<void> | void;
    onDone?: (...args: [...TArgs]) => Promise<void> | void;
};

const handleResponse = <TResponse, TArgs extends unknown[]>({
    callback,
    onError = () => {},
    onDone = () => {},
}: HandleResponseOpts<TResponse, TArgs>) => {
    return async (...args: TArgs): APIResult<TResponse> => {
        try {
            const response = await callback(...args);

            return {
                response,
                error: null,
            };
        } catch (err) {
            await onError(err as AxiosError, ...args);

            return {
                response: null,
                error: err as CustomAxiosError,
            };
        } finally {
            await onDone(...args);
        }
    };
};

export default handleResponse;
