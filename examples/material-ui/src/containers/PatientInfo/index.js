import React, { Component } from 'react';
import { Page } from 'react-formation';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from './actions';
import * as customValidators from '../../common/validators';
import messages from '../../common/dictionary';
import Form from './EditForm';


class PatientInfo extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(form, values) {
        this.props.actions.create('response', values);
    }

    render() {
        return (
            <Form
                name={this.props.formNames}
                form={this.props.page.form}
                model={this.props[formName].values}
                onSubmit={this.onSubmit}
            />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        [containerName]: state[containerName],
        [formName]: state[formName]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export const containerName = 'patientInfo';
export const formName = 'patientInfoCreate';

export default connect(mapStateToProps, mapDispatchToProps)(Page({
    formNames: formName,
    validators: customValidators,
    messages: messages.validator
})(PatientInfo));
