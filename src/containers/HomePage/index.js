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
                    label="Your name"
                />
            </Form>
        );
    }
}

export default HomePage;