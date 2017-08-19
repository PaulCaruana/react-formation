import React, { Component } from 'react';
import { Form, TextInput } from 'components';

import { connect } from 'react-redux';
import * as actions from './actions';

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

export default connect(state => state, actions)(HomePage);