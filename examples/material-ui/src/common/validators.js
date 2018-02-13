export const passwordValid = (value, props, validator, field) => {
    const REQUIRED_PATTERNS = [
        /\d+/,    //numeric values
        /[a-z]+/, //lowercase values
        /[A-Z]+/, //uppercase values
        /\W+/,    //special characters
        /^\S+$/   //no whitespace allowed
    ];
    let valid = true;
    if (isEmpty(value)) {
        return { valid };
    }
    REQUIRED_PATTERNS.forEach((pattern) => {
        valid = valid && pattern.test(value);
    });
    const message =
        `${props.label} must contain a number, uppercase, lowercase & special character`;
    return { valid, message };
};

export const emailInUse = (value, props, validatorType, field) => {
    if (isEmpty(value) || (field.hasAnotherError(validatorType))) {
        return { valid: true };
    }
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (['test@example.com', 'test@formation.com.au'].includes(value)) {
                reject({
                    valid: false,
                    message: `${value} is already taken`
                });
            } else {
                resolve({ valid: true });
            }
        }, 1000);
    });
}

function isEmpty(value) {
    return (!value || value === null || value === '');
}
