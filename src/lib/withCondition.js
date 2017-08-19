import React, { Component } from 'react';

const Toggle = ComposedComponent => class extends Component {

    render() {
        const display = (this.props.if === undefined || this.props.if);
        return (
            display
                ? <ComposedComponent {...this.props} />
                : null
        );
    }
};

export default Toggle;