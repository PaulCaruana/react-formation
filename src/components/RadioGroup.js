import React, { Component } from 'react';
import { RadioButtonGroup } from 'material-ui/RadioButton';
import { RadioButton } from 'material-ui/RadioButton';
import { Conditional, Field2 } from 'react-formwork';

export default Field2(RadioButtonGroup, {
    onChange: props => (event, checked) => props.onChange(event, null, checked),
    valueSelected: props => props.value,
    children: props => {
        const styles = {
            radio: {
                marginTop: 16,
            },
        };
        return {
            style: styles.radio
        };
    }
});