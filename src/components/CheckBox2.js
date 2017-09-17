import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import { Conditional, Field2 } from 'react-formwork';

export default Field2(Checkbox, {
    label: props => props.label,
    style: props => ({ marginTop: 16 }),
    onCheck: props => (event, checked) => props.onChange(event, null, checked),
    checked: props => props.value || false
});