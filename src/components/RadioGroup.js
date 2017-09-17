import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Conditional, Field2 } from 'react-formwork';

export default Field2(RadioButtonGroup, {
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
                        <RadioButton {...allChildProps} />
                    );
                }
            );
        }

        return items.map((item, i) => {
                const value = item.value || i + 1;
                const label = item.label || item.value;
                const allChildProps = { value, label, style, iconStyle }
                return (
                    <RadioButton {...allChildProps} />
                );
            }
        );
    }
});