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
        const values = this.props[formName].values;
        return (
            <Form name={this.props.formName} onSubmit={this.onSubmit}>
                <TextInput
                    name="lastName"
                    required
                    placeholder="Type your last name here"
                    label="Last name"
                />
                <Checkbox
                    name="over18"
                    label="Are you over 18 years old?"
                    defaultChecked={false}
                />
                <TextInput
                    if={values.over18}
                    name="age"
                    required
                    pattern="[0-9]*"
                    minValue="18"
                    maxValue="125"
                    placeholder="Type your age here"
                    label="Age"
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
export const pageName = 'home';
export const formName = 'homeForm';

export default connect(mapStateToProps, mapDispatchToProps)(Page({
    form: formName,
    validators: customValidators,
    messages: messages.validator
})(HomePage));
