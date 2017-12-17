import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from '../actions';

import assign from 'lodash.assign';
import FormController from './controllers/form';

 class Form extends Component {
    constructor(props) {
        super(props);
        this.name = this.props.name;
        this.page = this.props.page;
        this.registerChild = this.registerChild.bind(this);
        this.removeChild = this.removeChild.bind(this);
        this.submit = this.submit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    getChildContext() {
        return {
            update: this.props.actions.update,
            reset: this.props.actions.reset,
            formStatus: this.props.actions.formStatus,
            submit: this.submit,
            values: this.props.form.values,
            registerChild: this.registerChild
        };
    }

    componentWillMount() {
        this.form = FormController(this.props.name, this.props, this);
        this.context.registerForm(this.form);
    }

     registerChild(child) {
        return this.form.registerChild(child);
    }

    removeChild(child) {
        console.log("remove")
       // this.form.remove(child);
    }

    submit() {
        this.form.submitted();
        if (this.form.$ready) {
            this.props.onSubmit(assign({}, this.props.values));
            this.form.reset();
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.form, this.props.form.values);
    }

    render() {
        this.form.$renderPending = false;
        return (
            <form onSubmit={this.onSubmit} ref={element => { this.element = element; }}>
                {this.props.children}
            </form>
        );
    }
}

Form.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    values: PropTypes.object,
    update: PropTypes.func,
    reset: PropTypes.func,
    onSubmit: PropTypes.func
};

Form.contextTypes = {
    form: PropTypes.object,
    store: PropTypes.object,
    storeSubscription: PropTypes.object,
    registerForm: PropTypes.func
};

Form.childContextTypes = {
    update: PropTypes.func,
    reset: PropTypes.func,
    formStatus: PropTypes.func,
    submit: PropTypes.func,
    values: PropTypes.object,
    registerChild: PropTypes.func
};

function mapStateToProps(state, ownProps) {
    return {
        form : state[ownProps.name]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
