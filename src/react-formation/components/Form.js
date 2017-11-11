import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from '../actions';

import assign from 'lodash.assign';
import FormController from '../formController';

 class Form extends Component {
    constructor(props) {
        super(props);
        this.name = this.props.name;
        this.page = this.props.page;
        this.registerChild = this.registerChild.bind(this);
        this.removeChild = this.removeChild.bind(this);
        this.submit = this.submit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getChildContext() {
        return {
            update: this.props.actions.update,
            reset: this.props.actions.reset,
            submit: this.submit,
            values: this.props[this.name].values,
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

    handleSubmit = (e) => {
        e.preventDefault();

        //  extract the node list from the form
        //  it looks like an array, but lacks array methods
        const { pet } = this.form8;

        // a set of radios has value property
        // checkout out the log for proof
        //console.log(pet, pet.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} ref={form => {
                this.form8 = form;
            }}>
                {this.props.children.map((child) => {
                    //const xChild = { ...child, disabled: 'submit' };
                    //console.log(xChild)
                    return child;
                })}
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
    registerForm: PropTypes.func
};

Form.childContextTypes = {
    update: PropTypes.func,
    reset: PropTypes.func,
    submit: PropTypes.func,
    values: PropTypes.object,
    registerChild: PropTypes.func
};


function mapStateToProps(state, ownProps) {
    return {
        [ownProps.name]: state[ownProps.name]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
