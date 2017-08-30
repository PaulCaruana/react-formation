import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from './actions';

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
            update: this.props.actions.update,
            reset: this.props.actions.reset,
            submit: this.submit,
            values: this.props.form.values,
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


function mapStateToProps(state) {
    return {
        form: state.form
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Form);
