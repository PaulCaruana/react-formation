import React from 'react';
import SelectField from 'material-ui/SelectField';
import Option from './Option';
import { Field } from '../../';

export default Field(SelectField, {
    type: "select",
    hintText: props => props.placeholder,
    floatingLabelText: props => props.label,
    onChange: props => (event, key, payload) => props.onChange(event, payload),
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