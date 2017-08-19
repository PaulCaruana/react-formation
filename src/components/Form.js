import React, { PropTypes, Component } from 'react';
import assign from 'lodash.assign';

export default class Form extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                {this.props.children}
            </form>
        );
    }
}
