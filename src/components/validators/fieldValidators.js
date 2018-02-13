// src/validators.js
import validUrl from 'valid-url';
import emailValidator from 'email-validator';

export default {
    required: (value, props) => {
        return {
            valid: !isEmpty(value),
            message: `${props.label} must be entered`
        };
    },
    minLen: (value, props, validator) => {
        const ignore = isEmpty(value);
        const minLength = parseInt(props[validator]);
        return {
            valid: (ignore || value.length >= minLength),
            message: `${props.label} must be at least ${props[validator]} characters`
        };
    },
    maxLen: (value, props, validator) => {
        const ignore = isEmpty(value);
        const maxLength = parseInt(props[validator]);
        return {
            valid: (ignore || value.length <= maxLength),
            message: `${props.label} must be no loner than ${props[validator]} characters`
        };
    },
    url: (value, props) => {
        var valid = value && validUrl.isWebUri(value);
        return {
            valid: valid,
            message: `${props.label} url is invalid`
        };
    },
    email: (value, props, validator, field) => {
        const valid = (!value || value === null || value === '')
            ? true : emailValidator.validate(value)
        return {
            valid: valid,
            message: `${props.label} address is invalid`
        };
    },
    matches: (value, props, validator, field) => {
        const xItemFieldName = props[validator];
        const xItemField = getXItemField(props, xItemFieldName, field);
        const xItemValue = xItemField.getFieldValue();
        const ignore = (xItemField.$invalid || isEmpty(value) || isEmpty(xItemValue));
        return {
            valid: (ignore || value === xItemValue),
            message: `${props.label} must match ${props.xItemLabel}`
        };
    },
    notContains: (value, props, validator, field) => {
        const xItemFieldNameSet = props[validator];
        const xItemFieldNames = Array.isArray(xItemFieldNameSet) ?
            xItemFieldNameSet : xItemFieldNameSet.split(',');
        for (let i = 0; i < xItemFieldNames.length; i++) {
            const result = notContainsField(value, props, xItemFieldNames[i], field);
            if (!result.valid) {
                return result;
            }
        }
        return { valid: true };
    },
    minValue: (value, props, min) => {
        const val = Number(value);
        const minNum = Number(props[min]);
        return {
            valid: (value === undefined || value.trim() === '' || isNaN(val) || val >= minNum),
            message: `${props.label} must be least ${minNum}`
        };
    },
    maxValue: (value, props, max) => {
        const val = Number(value);
        const maxNum = Number(props[max]);
        return {
            valid: (value === undefined || value.trim() === '' || isNaN(val) || val <= maxNum),
            message: `${props.label} must be no more than ${maxNum}`
        };
    },
    integer: (value, props) => {
        return {
            valid: (value === undefined || value.trim() === '' || /^[+-]?\d+$/i.test(value.trim())),
            message: `${props.label} must be a whole number`
        };
    },
    userNameIsValid: (value, props, validator, field) => {
        if (isEmpty(value) || (field.$invalid && !field.$errors[validator])) {
            return {valid: true};
        }
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (['john', 'paul', 'george', 'ringo'].includes(value)) {
                    resolve({valid: true});
                } else {
                    reject({
                        valid: false,
                        message: `${props.label} must contain a Beetle`
                    });
                }
            }, 1000)
        });
    }
};

function notContainsField(value, props, xItemFieldName, field) {
    const xItemField = getXItemField(props, xItemFieldName, field);
    const xItemValue = xItemField.getFieldValue();
    const ignore = (xItemField.$invalid || isEmpty(value) || isEmpty(xItemValue));
    return {
        valid: ignore || (value.toLowerCase().indexOf(xItemValue.toLowerCase()) === -1),
        message: `${props.label} must not contain ${props.xItemLabel}`
    };
}

function getXItemField(props, xItemFieldName, field) {
    const xItemField = field.getField(xItemFieldName);
    xItemField.addTriggerValidation(field);
    const fieldLabel = field.getFieldLabel(xItemFieldName);
    const xItemLabel = `${xItemFieldName}Label`;
    props[xItemLabel] = fieldLabel;
    props.xItemLabel = fieldLabel;
    return xItemField;
}

function isEmpty(value) {
    return (value === undefined || value === null || value === '');
}

