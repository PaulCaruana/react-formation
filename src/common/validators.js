export const passwordValid = (value, props, validator, field) => {
    const REQUIRED_PATTERNS = [
        /\d+/,    //numeric values
        /[a-z]+/, //lowercase values
        /[A-Z]+/, //uppercase values
        /\W+/,    //special characters
        /^\S+$/   //no whitespace allowed
    ];
    let valid = true;
    const { passwordValid, ...rest } = field.$errors;
    if (isEmpty(value) || !!Object.keys(rest).length) {
        return { valid };
    }
    REQUIRED_PATTERNS.forEach((pattern) => {
        valid = valid && pattern.test(value);
    });
    const message =
        `${props.label} must contain a number, uppercase, lowercase & special character`;
    return { valid, message };
};

function isEmpty(value) {
    return (!value || value === null || value === '');
}
