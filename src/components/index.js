import React, { Component } from 'react';
import * as formComponents from './mui/form';
import { Form } from 'react-formation';
import { ComposeMany, Conditional } from 'react-componentize';

export default Form;
export const {
    TextInput,
    TextArea,
    Password,
    Checkbox,
    Switch,
    Select,
    Option,
    RadioGroup,
    Radio,
    DatePicker,
    TimePicker,
    Button
} = ComposeMany(Conditional, formComponents);
