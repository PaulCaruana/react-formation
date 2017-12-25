import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageController from './controllers/page';

const Page = (config) => {
    return (ComposedComponent) => class extends Component {

        static childContextTypes = {
            config: PropTypes.object,
            registerForm: PropTypes.func
        };

        constructor(props) {
            super(props);
            this.page = new PageController();
        }

        getChildContext() {
            const registerForm = this.registerForm.bind(this);
            return { config, registerForm };
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