import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import { Form, TextInput } from 'components';

class HomePage extends Component {
    render() {
        return (
            <Form>
                <TextInput
                    name="name"
                    required
                    placeholder="Type your name here"
                    label="Name"
                />
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