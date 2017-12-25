// src/validators.js
import validUrl from 'valid-url';
import emailValidator from 'email-validator';

export default {
    required: (value, props) => {
        var valid = (value && value !== '');
        return {
            valid: valid,
            message: `${props.label} must be entered`
        };
    },
    url: (value, props) => {
        var valid = value && validUrl.isWebUri(value);
        return {
            valid: valid,
            message: `${props.label} url is invalid`
        };
    },
    email: (value, props, type, field) => {
        var valid = (!value || value === null || value === "") ? true : emailValidator.validate(value)
        return {
            valid: valid,
            message: `${props.label} address is invalid`
        };
    },
    suburbMatches: (value, props, type, field) => {
        var postcodeName = props[type];
        field.clearFieldError(postcodeName, 'postcodeMatches')
        return suburbMatchesPostcode(value, props.label, field.getFieldValue(postcodeName), field.getFieldLabel(postcodeName));
    },
    postcodeMatches: (value, props, type, field) => {
        var suburbName = props[type];
        field.clearFieldError(suburbName, 'suburbMatches')
        return suburbMatchesPostcode(field.getFieldValue(suburbName), field.getFieldLabel(suburbName), value, props.label);
    },
    userNameIsValid: (value, props, type, field) => {
        if (isEmpty(value) || (field.$invalid && !field.$errors[type])) {
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

function suburbMatchesPostcode(suburb, suburbLabel, postcode, postcodeLabel) {
    if (isEmpty(suburb) || isEmpty(postcode)) {
        return {valid: true};
    }
    ;
    var valid = true
    if (suburb === 'Pyrmont') {
        valid = (postcode === "2009")
    }
    return {
        valid: valid,
        message: `${ suburbLabel } ${ suburb } does not match ${ postcodeLabel } ${ postcode }`
    }
}

function isEmpty(value) {
    return (!value || value === null || value === '');
}

