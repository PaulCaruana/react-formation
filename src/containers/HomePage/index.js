import React, { Component } from 'react';
import { Form, TextInput, SelectBox, Option, Toggle, Checkbox, RadioButtonGroup, RadioButton } from 'components';


class HomePage extends Component {
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
        const styles = {
            radioButton: {
                marginTop: 16,
            },
        };
        return (
            <Form name="home">
                <RadioButtonGroup name="salutation" required >
                    <RadioButton value="mr" label="Mr" />
                    <RadioButton value="mrs" label="Mrs" />
                    <RadioButton value="ms" label="Ms" />
                </RadioButtonGroup>
                <TextInput
                    name="name"
                    required
                    placeholder="Type your name here"
                    label="Name"
                />
                <SelectBox required items={items} label="Contact method" name="contactMethod" />
                <TextInput
                    name="email"
                    required
                    email
                    placeholder="Type your email here"
                    label="E-mail"
                />
                <Toggle
                    name="postalAddress"
                    label="Is your postal different than address?"
                />
                <Checkbox
                    name="over18"
                    label="Are you over 18 years old?"
                />
            </Form>
        );
    }
}

export default HomePage;