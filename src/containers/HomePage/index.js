import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

class HomePage extends Component {
    render() {
        return (
            <form>
                <div>React simple starter</div>
            </form>
        );
    }
}

export default connect(state => state, actions)(HomePage);