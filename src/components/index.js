import React, { Component } from 'react';
import * as formComponents from './mui/form';
import { Form } from 'react-formwork';
import { ComposeMany, Conditional } from 'react-componentize';

export default Form;
export const { TextInput, Checkbox, Switch, Select, Option, RadioGroup, Radio, Button } = ComposeMany(Conditional, formComponents);
