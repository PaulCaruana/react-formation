import React, { Component } from 'react';
import { Form } from 'components';

import { connect } from 'react-redux';
import * as actions from './actions';

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