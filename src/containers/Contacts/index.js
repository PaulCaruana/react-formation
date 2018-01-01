import React, { Component } from 'react';
import { TextInput, TextArea, Password, Checkbox, Switch, Select, RadioGroup, Radio, DatePicker, Button }
    from 'components/index';
import { Page, Form } from 'react-formation';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from './actions';
import * as customValidators from '../../common/validators';
import messages from '../../common/dictionary';


class PatientInfo extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(form, values) {
        this.props.actions.create('response', values);
    }

    render() {
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
        const form = this.props.page.form;
        const vm = this.props[formName].values;
        const today = new Date().setHours(0,0,0,0);
        return (
            <Form name={this.props.formName} onSubmit={this.onSubmit}>
                <RadioGroup name="salutation" required >
                    <Radio value="mr" label="Mr" />
                    <Radio value="mrs" label="Mrs" />
                    <Radio value="ms" label="Ms" />
                </RadioGroup>
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
                    if={vm.over18}
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
                    placeholder="Enter appointment date"
                    required
                    shouldDisableDate={(date) => {
                        return date.getTime() < today;
                    }}
                />
                <Button type="submit" primary label="Submit" disabled={form.$invalid} />
            </Form>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        [pageName]: state[pageName],
        [formName]: state[formName]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export const pageName = 'contact';
export const formName = 'contactForm';

export default connect(mapStateToProps, mapDispatchToProps)(Page({
    form: formName,
    validators: customValidators,
    messages: messages.validator
})(PatientInfo));
