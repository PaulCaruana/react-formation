import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import Form from 'components/Form';

class HomePage extends Component {
    render() {
        return (
            <Form>
                <div>React simple starter</div>
            </Form>
        );
    }
}

export default connect(state => state, actions)(HomePage);