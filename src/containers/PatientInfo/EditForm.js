import React from 'react';
import { Form } from 'react-formation';
import { TextInput, TextArea, Password, Checkbox, Switch, Select, RadioGroup, Radio, DatePicker, TimePicker, Button }
    from 'components/index';
import * as customValidators from '../../common/validators';
import messages from '../../common/dictionary';

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
            <TextInput
                name="firstName"
                required
                placeholder="Type your first name here"
                label="First name"
            />
            <TextInput
                name="lastName"
                required
                placeholder="Type your last name here"
                label="Last name"
            />
            <Password
                name="password"
                label="Password"
                required
                minLen="6"
                maxLen="12"
                notContains="firstName,lastName"
                passwordValid
            />
            <Password
                name="confirmPassword"
                required
                matches="password"
                label="Password confirmation"
            />
            <Checkbox
                name="over18"
                label="Are you over 18 years old?"
                defaultChecked={false}
            />
            <TextInput
                if={model.over18}
                name="age"
                required
                pattern="[0-9]*"
                minValue="18"
                maxValue="125"
                placeholder="Type your age here"
                label="Age"
            />
            <TextArea
                name="apptDetails"
                label="Appointment details"
                placeholder="Enter appointment details"
                required
            />
            <Select required options={items} label="Contact method" name="contactMethod" />
            <TextInput
                name="email"
                required
                email
                placeholder="Type your email here"
                label="E-mail"
            />
            <Switch
                name="postalAddress"
                label="Is your postal different than address?"
            />
            <DatePicker
                name="apptDate"
                label="Appointment date"
                placeholder="Enter appointment date"
                required
                shouldDisableDate={(date) => {
                    return date.getTime() < today;
                }}
            />
            <TimePicker
                name="apptTime"
                label="Appointment time"
                placeholder="Enter appointment time"
                required
            />
            <Button type="submit" primary label="Submit" />
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
