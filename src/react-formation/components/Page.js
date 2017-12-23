import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageController from './controllers/page';

const Page = (config) => {
    return (ComposedComponent) => class extends Component {

        static childContextTypes = {
            registerForm: PropTypes.func
        };

        constructor(props) {
            super(props);
            this.registerForm = this.registerForm.bind(this);
            this.page = new PageController();
        }

        getChildContext() {
            return {
                registerForm: this.registerForm
            };
        }

        registerForm(form) {
            this.page.registerForm(form);
        }

        get form() {
            return this.page.form;
        }

        render() {
            return <ComposedComponent
                {...this.props}
                page={this.page}
                ref={instance => this.page.registerComponent(instance)}
                formName={config.form} />;
        }
    };
};

export default Page;