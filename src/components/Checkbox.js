import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import { Conditional, Field } from 'react-formwork';

export default Field(Checkbox, {
    label: props => props.label,
    style: props => ({ marginTop: 16 }),
    onCheck: props => (event, checked) => props.onChange(event, null, checked),
    checked: props => props.value || false
});