import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import { Form, Text } from 'components';

class HomePage extends Component {
    render() {
        return (
            <Form>
                <Text
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