import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { Conditional, Field } from 'react-formwork';

export default Field(TextField, {
    hintText: props => props.placeholder,
    floatingLabelText: props => props.label
});