import React from 'react';
import { RadioButton as Radio, RadioButtonGroup } from 'material-ui/RadioButton';
import { Field } from 'react-formation';

export default Field(RadioButtonGroup, {
    type: "radio",
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
