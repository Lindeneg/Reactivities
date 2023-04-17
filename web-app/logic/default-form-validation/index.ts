import { capitalize } from '@mui/material';
import objectKeys from '../object-keys';

type MappedConstraint<T> = { [K in keyof T]: T[K] };

type FunctionConstraint<T> = { [K in keyof T]: (value: T[K]) => boolean };

type ErrorMap<T> = Record<keyof T, string>;

type Options<TValues extends MappedConstraint<TValues>, TOverrides extends FunctionConstraint<TValues>> = {
    overrides: Partial<TOverrides>;
    exclude: Array<keyof TValues>;
};

const createRequiredString = <T>(key: T) => `${capitalize(String(key))} is required`;

const defaultFormValidation = <
    TValues extends MappedConstraint<TValues>,
    TOverrides extends FunctionConstraint<TValues>
>(
    values: TValues,
    options?: Partial<Options<TValues, TOverrides>>
) => {
    const { overrides, exclude } = { overrides: options?.overrides || {}, exclude: options?.exclude || [] } as Options<
        TValues,
        TOverrides
    >;

    return objectKeys(values).reduce((acc, key) => {
        if (exclude.includes(key)) return acc;

        const value = values[key];
        const isValidOverride = overrides[key];

        if (typeof isValidOverride === 'function') {
            if (!isValidOverride(value)) acc[key] = createRequiredString(key);
            return acc;
        }

        if (!value) {
            acc[key] = createRequiredString(key);
        }

        return acc;
    }, {} as ErrorMap<TValues>);
};

export default defaultFormValidation;
