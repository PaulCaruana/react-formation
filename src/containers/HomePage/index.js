import React, { Component } from 'react';
import { Form, TextInput, SelectBox, Option } from 'components';
import MenuItem from 'material-ui/MenuItem';

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
        return (
            <Form name="home">
                <TextInput
                    name="name"
                    required
                    placeholder="Type your name here"
                    label="Name"
                />
                <SelectBox required items={items} label="Contact method" name="contactMethod">
                </SelectBox>
                <TextInput
                    name="email"
                    required
                    email
                    placeholder="Type your email here"
                    label="E-mail"
                />
            </Form>
        );
    }
}

export default HomePage;