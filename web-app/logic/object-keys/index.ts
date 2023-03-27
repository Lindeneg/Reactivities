const objectKeys = <TObj extends Record<PropertyKey, unknown>>(val: TObj) => Object.keys(val) as Array<keyof TObj>;

export default objectKeys;
