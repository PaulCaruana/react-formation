import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageController from './controllers/page';
import fieldValidators from './validators/fieldValidators';

const Page = (config) => {
    return (ComposedComponent) => class extends Component {

        static childContextTypes = {
            config: PropTypes.object,
            registerForm: PropTypes.func
        };

        constructor(props) {
            super(props);
            this.page = new PageController();
            const customFieldValidators = config.validators || {};
            this.config = config || {};
            this.config.validators = Object.assign(customFieldValidators, fieldValidators);
            this.config.messages = config.messages || function (dftMessage) { return dftMessage; };
         }

        getChildContext() {
            return {
                config: this.config,
                registerForm: this.registerForm.bind(this)
            };
        }

        registerForm(form) {
            this.page.registerForm(form);
        }

        get form() {
            return this.page.form;
        }

        render() {
            return (<ComposedComponent
                {...this.props}
                page={this.page}
                ref={instance => this.page.registerComponent(instance)}
                formName={config.form}
            />);
        }
    };
};

export default Page;