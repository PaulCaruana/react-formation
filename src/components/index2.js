import React, { Component } from 'react';
import * as formComponents from './mui/form';
import { ComposeMany, Conditional } from 'react-componentize';

export const { TextInput, Checkbox, Switch, Select, Option, RadioGroup, Radio } = ComposeMany(Conditional, formComponents);
