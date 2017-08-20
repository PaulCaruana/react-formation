import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from '../actions';

import assign from 'lodash.assign';
import formFields from 'lib/formFields';

class Form extends Component {
    constructor(props) {
        super(props);
        this.registerChild = this.registerChild.bind(this);
        this.removeChild = this.removeChild.bind(this);
        this.submit = this.submit.bind(this);
    }

    getChildContext() {
        return {
            update: this.props.update,
            reset: this.props.reset,
            submit: this.submit,
            values: this.props.values,
            registerChild: this.registerChild
        };
    }

    componentWillMount() {
        this.form = formFields(this.props.name, this.props, this);
    }

    registerChild(child) {
        return this.form.registerChild(child);
    }

    removeChild(child) {
        this.form.remove(child);
    }

    submit() {
        this.form.submitted();
        if (this.form.$ready) {
            this.props.onSubmit(assign({}, this.props.values));
            this.form.reset();
        }
    }

    render() {
        return (
            <form>
                {this.props.children}
            </form>
        );
    }
}

Form.propTypes = {
    children: PropTypes.node,
    values: PropTypes.object,
    update: PropTypes.func,
    reset: PropTypes.func,
    onSubmit: PropTypes.func
};

Form.childContextTypes = {
    update: PropTypes.func,
    reset: PropTypes.func,
    submit: PropTypes.func,
    values: PropTypes.object,
    registerChild: PropTypes.func
};

export default connect(state => state, actions)(Form);
