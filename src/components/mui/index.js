import React, { Component } from 'react';
import { TextField, Toggle, Checkbox as muiCheckbox, MenuItem, SelectField, RadioButton as Radio, RadioButtonGroup } from 'material-ui';
import { Field, mapProps } from 'react-formwork';

export { Form } from 'react-formwork';

export function Components(hoc) {
    const composedComponents = {
        TextInput, Checkbox, Switch, Select, Option, RadioGroup, Radio
    };
    if (hoc) {
        return Object.keys(composedComponents).reduce((acc, propName) => {
            return {
                ...acc,
                [propName]: hoc(composedComponents[propName])
            };
        }, {});
    }
    return composedComponents;
}

const componentMappers = {
    TextField: {
        hintText: props => props.placeholder,
        floatingLabelText: props => props.label
    }
};
