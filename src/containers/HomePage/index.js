import React, { Component } from 'react';
import { TextInput, Checkbox, Switch, Select, RadioGroup, Radio, Button } from 'components/index';
import { Page, Form } from 'react-formation';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from './actions';


class HomePage extends Component {
    constructor(page) {
        super(page);
        page.register(this);
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
        const form = this.page.form;
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
                <Button type="submit" primary label="Submit" disabled={false} />
            </Form>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        [ownProps.name]: state[ownProps.name]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default Page(connect(mapStateToProps, mapDispatchToProps)(HomePage), 'home');