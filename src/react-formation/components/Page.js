import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageController from './controllers/page';

const Page = (ComposedComponent, name) => class extends Component {

    static childContextTypes = {
        registerForm: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.registerForm = this.registerForm.bind(this);
        this.page = {};
    }

    getChildContext() {
        return {
            registerForm: this.registerForm
        };
    }

    registerPage(pageComponent) {
        this.page = new PageController(pageComponent);
    }

    registerForm(form) {
        this.page.setForm(form);
    }

    render() {
        var formName = `${name}Form`;
        return <ComposedComponent register={this.registerPage.bind(this)} name={name} formName={formName} />;
    }
};

export default Page;