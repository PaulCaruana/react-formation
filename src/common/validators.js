const test = (params) => {
    console.log(params)
}
export const minValue = (value, props, min) => {
    const val = Number(value);
    const minNum = Number(props[min]);
    return {
        valid: (value === undefined || value.trim() === '' || isNaN(val) || val >= minNum),
        message: `${props.label} must be least ${minNum}`
    };
};
export const maxValue = (value, props, max) => {
    const val = Number(value);
    const maxNum = Number(props[max]);
    return {
        valid: (value === undefined || value.trim() === '' || isNaN(val) || val <= maxNum),
        message: `${props.label} must be no more than ${maxNum}`
    };
};

export const integer = (value, props) => {
    return {
        valid: (value === undefined || value.trim() === '' || /^[+-]?\d+$/i.test(value.trim())),
        message: `${props.label} must be a whole number`
    };
}
