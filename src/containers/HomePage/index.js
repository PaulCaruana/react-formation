import React, { Component } from 'react';
import { TextInput, Checkbox, Switch, Select, RadioGroup, Radio, Button } from 'components/index';
import { Page, Form } from 'react-formation';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from './actions';
import * as customValidators from '../../common/validators';
import messages from '../../common/dictionary';


class HomePage extends Component {
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
        return (
            <Form name={this.props.formName} onSubmit={this.onSubmit}>
                <TextInput
                    name="suburb"
                    placeholder="Suburb"
                    label="Suburb"
                />
                <RadioGroup name="salutation" required >
                    <Radio value="mr" label="Mr" />
                    <Radio value="mrs" label="Mrs" />
                    <Radio value="ms" label="Ms" />
                </RadioGroup>
                <TextInput
                    name="name"
                    required
                    placeholder="Type your name here"
                    label="Name"
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
                <Checkbox
                    name="over18"
                    label="Are you over 18 years old?"
                />
                <TextInput
                    name="age"
                    required
                    integer
                    minValue="18"
                    maxValue="125"
                    placeholder="Type your age here"
                    label="Age"
                    />
                <Button type="submit" primary label="Submit" disabled={form.field('name').$invalid} />
            </Form>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        [pageName]: state[pageName]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export const pageName = 'home';
export const formName = 'homeForm';

export default connect(mapStateToProps, mapDispatchToProps)(Page({
    form: formName,
    validators: customValidators,
    messages: messages.validator
})(HomePage));
