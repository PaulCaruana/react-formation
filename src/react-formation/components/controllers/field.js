import PropTypes from 'prop-types';

import fieldValidators from '../validators/fieldValidators';
import shallowEqual from 'react-pure-render/shallowEqual';
import isPromise from 'is-promise';


export default function Field(name, props, component) {
    let validators = null;
    if (name !== '_empty') {
        const config = component.context.config;
        const customFieldValidators = config.validators || {};
        validators = Object.assign(customFieldValidators, fieldValidators);
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
        addError: function (type, message) {
            if (this.$errors[type] === message) {
                return;
            }
            this.$errors[type] = message;
            this.$valid = false;
            this.$invalid = true;
            this.redraw();
        },
        clearError: function (type) {
            if (!this.$errors[type]) {
                return;
            }
            delete this.$errors[type];
            this.$valid = this.isValid();
            this.$invalid = !this.$valid;
            this.redraw();
        },
        isValid: function () {
            return (Object.keys(this.$errors).length === 0);
        },
        validate: function (value) {
            const promises = [];
            var validatorTypes = this.getValidators(props);
            for (var i = 0; i < validatorTypes.length; i++) {
                var type = validatorTypes[i];
                var validateResult = this.$validators[type](value, props, type, this);
                if (isPromise(validateResult)) {
                    this.setPending(true);
                    validateResult.then(result => {
                        this.addClearError(type, result);
                    }).catch(result => {
                        this.addClearError(type, result);
                    });
                } else {
                    this.addClearError(type, validateResult);
                }
                promises.push(validateResult);
            }
            Promise.all(promises).then(() => {
                this.setPending(false);
            }).catch(() => {
                this.setPending(false);
            });
        },
        addClearError: function(type, result) {
            if (result.valid) {
                this.clearError(type);
            } else {
                this.addError(type, result.message);
            }
        },
        showErrors: function () {
            return this.$invalid && (this.$touched || this.$form.$submitted);
        },
        getField: function(fieldName) {
            return this.$form.getChild(fieldName);
        },
        getFieldValue: function(fieldName) {
            return this.component.context.values[fieldName];
        },
        getFieldLabel: function(fieldName) {
            var field = this.getField(fieldName);
            return (field)? field.props.label : null;
        },
        clearFieldError: function(fieldName, type) {
            var field = this.getField(fieldName);
            field.clearError(type);
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
        onChange: function (value) {
            this.setDirty(true);
            this.$renderPending = true;
            this.validate(value);
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
