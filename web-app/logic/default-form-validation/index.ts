import capitalizeString from '../capitalize-string';

// we need to constrain TValues to an object
// however if an interface is given as the generic type
// we need to map it in order for the constraint to be satisfied
// haven't found a better solution than this
type MappedConstraint<T> = { [K in keyof T]: T[K] };

type FunctionConstraint<T> = { [K in keyof T]: (value: T[K]) => boolean };

type ErrorMap<T> = Record<keyof T, string>;

type Options<TValues extends MappedConstraint<TValues>, TOverrides extends FunctionConstraint<TValues>> = {
    overrides: Partial<TOverrides>;
    exclude: Array<keyof TValues>;
};

const createRequiredString = (key: string) => `${capitalizeString(key)} is required`;

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

    return Object.keys(values).reduce((acc, _key) => {
        if (exclude.includes(_key as keyof TValues)) return acc;

        const key = _key as keyof TValues;
        const value = values[key];
        const isValidOverride = overrides[key];

        if (typeof isValidOverride === 'function') {
            if (!isValidOverride(value)) acc[key] = createRequiredString(_key);
            return acc;
        }

        if (!value) {
            acc[key] = createRequiredString(_key);
        }

        return acc;
    }, {} as ErrorMap<TValues>);
};

export default defaultFormValidation;
