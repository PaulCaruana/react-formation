import React from 'react';
import { Form } from 'react-formation';
import { TextInput, TextArea, Password, Checkbox, Switch, Select, RadioGroup, Radio, DatePicker, TimePicker, Button }
    from 'react-formation/mapperComponents/mui';
import ToggleDisplay from 'react-toggle-display';

const today = new Date().setHours(0, 0, 0, 0);
const items = [
    {
        value: 'phone',
        label: 'Phone'
    },
    {
        value: 'email',
        label: 'Email'
    }
];

const PatientInfo = ({ name, form, model, onSubmit }) => {
    return (
        <Form name={name} onSubmit={onSubmit}>
            <RadioGroup name="salutation" required label="Salutation">
                <Radio value="mr" label="Mr" />
                <Radio value="mrs" label="Mrs" />
                <Radio value="ms" label="Ms" />
            </RadioGroup>
        </Form>
    );
};
/*
export default Page({
    formNames: formName,
    validators: customValidators,
    messages: messages.validator
})(PatientInfo);
*/
export default PatientInfo;
