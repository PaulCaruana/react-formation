import PropTypes from 'prop-types';

import fieldValidators from '../validators/fieldValidators';
import isPromise from 'is-promise';


export default function Field(name, props, component) {
    console.log('field', name)
    var field = {
        name: name,
        props: props,
        component: component,
        $errors: {},
        $form: null,
        $isField: true,
        $isForm: false,
        $validators: fieldValidators,
        updated: function () {
            this.$dirty = true;
            this.$pristine = false;
        },
        touched: function () {
            this.$touched = true;
            this.$untouced = false;
        },
        addError: function (type, message) {
            this.$errors[type] = message;
            this.$valid = false;
            this.$invalid = true;
        },
        clearError: function (type) {
            if (this.$errors[type]) {
                delete this.$errors[type];
            }
            this.$valid = this.isValid();
            this.$invalid = !this.$valid;
        },
        isValid: function () {
            return (Object.keys(this.$errors).length == 0);
        },
        validate: function (value) {
            this.$pending = true;
            const promises = [];
            var validatorTypes = this.getValidators(props);
            for (var i = 0; i < validatorTypes.length; i++) {
                var type = validatorTypes[i];
                var validateResult = this.$validators[type].validate(value, props, type, this);
                if (isPromise(validateResult)) {
                     validateResult.then( result => {
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
                this.$pending = false;
                this.redraw();
            }).catch(() => {
                this.$pending = false;
                this.redraw();
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
                return (fieldValidators[attrName])
            });
        },
        redraw: function() {
            if (this.$form && this.$form.redraw) {
                this.$form.redraw();
            }
        },
        reset: function () {
            this.$valid = true;
            this.$invalid = false;
            this.$dirty = false;
            this.$pristine = true;
            this.$touched = false;
            this.$untouced = true;
            this.$pending = false;
            this.$form = {};
            this.$errors = {};
            this.redraw();
        },
        onChange: function (value) {
            this.updated();
            this.validate(value);
            this.redraw();
        },
        onBlur: function (value) {
            this.touched();
            this.validate(value);
            //this.redraw();
        }
    };
    field.reset();
    return field;
}

Field.contextTypes = {
    values: PropTypes.object.isRequired
};
