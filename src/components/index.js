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

const TextInput = Field(TextField, {
    hintText: props => props.placeholder,
    floatingLabelText: props => props.label
});

const Checkbox = Field(muiCheckbox, {
    label: props => props.label,
    style: props => ({ marginTop: 16 }),
    onCheck: props => (event, checked) => props.onChange(event, null, checked),
    checked: props => props.value || false
});

const Switch = Field(Toggle, {
    labelStyle: props => ({ width: 'auto', marginRight: 16 }),
    style: props => ({ marginTop: 16 }),
    onToggle: props => (event, checked) => props.onChange(event, null, checked),
    toggled: props => props.value || false
});

const Select = Field(SelectField, {
    hintText: props => props.placeholder,
    floatingLabelText: props => props.label,
    children: props => {
        const items = props.options;
        if (!items) {
            return props.children;
        }

        return items.map((item, i) => {
                const key = item.key || item.value;
                const value = item.value || i + 1;
                const label = item.label || item.value;
                return (
                    <Option key={key} value={value} label={label} />
                );
            }
        );
    }
});

class Option extends Component {
    render() {
        const mapper = { primaryText: props => props.label };
        const componentProps = mapProps(this.props, mapper)(MenuItem);
        return (
            <MenuItem {...componentProps} />
        );
    }
}

Option.muiName = 'MenuItem';

const RadioGroup = Field(RadioButtonGroup, {
    onChange: props => (event, checked) => props.onChange(event, null, checked),
    valueSelected: props => props.value,
    style: props => ({ display: 'flex', marginTop: 16 }),
    children: props => {
        const items = props.values;
        const style = {
            width: 'auto',
            marginRight: 24,
        }
        const iconStyle = {
            marginRight: 8,
        };
        if (!items) {
            return props.children.map((child) => {
                    const childProps = child.props;
                    const allChildProps = { style, iconStyle, ...childProps }
                    return (
                        <Radio {...allChildProps} />
                    );
                }
            );
        }

        return items.map((item, i) => {
                const value = item.value || i + 1;
                const label = item.label || item.value;
                const allChildProps = { value, label, style, iconStyle }
                return (
                    <Radio {...allChildProps} />
                );
            }
        );
    }
});
