import PropTypes from 'prop-types';

import fieldValidators from '../validators/fieldValidators';
import shallowEqual from 'react-pure-render/shallowEqual';
import isPromise from 'is-promise';


export default function Field(name, props, component) {
    let validators = null;
    let validatorMessages = null;
    if (name !== '_empty') {
        const config = component.context.config;
        validators = config.validators;
        validatorMessages = config.messages;
    }
    var field = {
        name: name,
        props: props,
        component: component,
        $errors: {},
        $form: null,
        $isField: true,
        $isForm: false,
        $validators: validators,
        $validatorMessages: validatorMessages,
        $messageTemplates: {},
        $triggerValidations: [],
        setPending: function(pending) {
            if (pending === this.$pending) {
                return;
            }
            this.$pending = pending;
            this.redraw();
        },
        setTouched: function(touched) {
            if (touched === this.$touched) {
                return;
            }
            this.$touched = touched;
            this.$untouched = !touched;
            this.redraw();
        },
        setDirty: function(dirty) {
            if (dirty === this.$dirty) {
                return;
            }
            this.$dirty = dirty;
            this.$pristine = !dirty;
            this.redraw();
        },
        isValid: function () {
            return (Object.keys(this.$errors).length === 0);
        },
        validate: function (value) {
            const promises = [];
            var validatorTypes = this.getValidators(props);
            for (var i = 0; i < validatorTypes.length; i++) {
                var validator = validatorTypes[i];
                var validateResult = this.validateType(value, props, validator);
                promises.push(validateResult);
            }
            Promise.all(promises).then(() => {
                this.setPending(false);
            }).catch(() => {
                this.setPending(false);
            });
        },
        validateType: function(value, props, validator) {
            const validateResult = this.$validators[validator](value, props, validator, this);
            let message = null;
            if (isPromise(validateResult)) {
                this.setPending(true);
                validateResult.then(result => {
                    this.clearError(validator);
                }).catch(result => {
                    message = this.getMessageTemplates(result.message, validator, props["type"], props.name)
                    this.addError(validator, message);
                });
            } else {
                if (validateResult.valid) {
                    this.clearError(validator);
                } else {
                    console.log(props.name, validator)
                    message = this.getMessageTemplates(validateResult.message, validator, props["type"], props.name)
                    this.addError(validator, message);
                }
            }
            return validateResult;
        },
        getMessageTemplates: function(dftMessage, validator, type, name) {
            if (!this.$messageTemplates[validator]) {
                const messageTemplate = validatorMessages(validator, type, name);
                this.$messageTemplates[validator]
                    = (messageTemplate) ? eval('`' + messageTemplate + '`') : dftMessage; //eslint-disable-line
            }
            return this.$messageTemplates[validator];
        },
        addClearError: function(validator, result) {
            if (result.valid) {
                this.clearError(validator);
            } else {
                this.addError(validator, result.message);
            }
        },
        addError: function (validatorType, dftMessage) {
            const message = dftMessage
            if (this.$errors[validatorType] === message) {
                return;
            }
            this.$errors[validatorType] = message;
            this.$valid = false;
            this.$invalid = true;
            this.redraw();
        },
        clearError: function (validator) {
            if (!this.$errors[validator]) {
                return;
            }
            delete this.$errors[validator];
            this.$valid = this.isValid();
            this.$invalid = !this.$valid;
            this.redraw();
        },
        showErrors: function () {
            return this.$invalid && (this.$touched || this.$form.$submitted);
        },
        getField: function(fieldName) {
            return this.$form.getChild(fieldName);
        },
        getFieldValue: function(fieldName) {
            fieldName = fieldName || this.name;
            return this.component.context.values[fieldName];
        },
        getFieldLabel: function(fieldName) {
            var field = this.getField(fieldName);
            return (field)? field.props.label : null;
        },
        clearFieldError: function(fieldName, validator) {
            var field = this.getField(fieldName);
            field.clearError(validator);
        },
        getVisibleErrors: function () {
            if (this.showErrors()) {
                return Object.keys(this.$errors).map((key) => {
                    return this.$errors[key];
                });
            } else {
                return null;
            }
        },
        getValidators: function (props) {
            var attrNames = Object.keys(props);
            return attrNames.filter(attrName => {
                return (this.$validators[attrName])
            });
        },
        redraw: function() {
            this.$renderPending = true;
            if (this.$form && this.$form.redraw) {
                this.$form.redraw();
            }
        },
        reset: function () {
            this.$valid = true;
            this.$invalid = false;
            this.setDirty(false);
            this.setTouched(false);
            this.setPending(false);
            this.$form = {};
            this.$errors = {};
            this.$renderPending = false;
        },
        addTriggerValidation(field) {
            const index = this.$triggerValidations.findIndex(function (triggerField) {
                return triggerField === field;
            });
            if (index === -1) {
                this.$triggerValidations.push(field);
            }
        },
        triggerValidations() {
            this.$triggerValidations.forEach((field) => {
                const fieldValue = field.getFieldValue();
                field.validate(fieldValue);
            });
        },
        onChange: function (value) {
            this.setDirty(true);
            this.$renderPending = true;
            this.validate(value);
            this.triggerValidations();
        },
        onBlur: function (value) {
            this.setTouched(true);
            //this.validate(value);
        }
    };
    field.reset();
    return field;
}

Field.contextTypes = {
    values: PropTypes.object.isRequired
};
