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

        registerPage(pageComponent) {
            console.log("reg", pageComponent);
            this.page = new PageController(pageComponent);
        }

        registerForm(form) {
            this.page.setForm(form);
        }

        proc(pageComponent) {
           // this.page = new PageController(pageComponent);
            console.log("proc", pageComponent);
        }

        get form() {

        }

        render() {
            return <ComposedComponent {...this.props}
                ref={event => this.proc.bind(this)(event)}
                register={this.registerPage.bind(this)}
                formName={config.form} />;
        }
    };
};

export default Page;