import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ComposedForm = ComposedComponent => class extends Component {

    static childContextTypes = {
        registerForm: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.registerForm = this.registerForm.bind(this);
        this._form = {};
        this._forms = {};
    }

    getChildContext() {
        return {
            registerForm: this.registerForm
        };
    }

    registerForm(form) {
        this._form = form;
        this._forms[form.name] = form;
    }

    getForm() {
        return this._form;
    }

    formx(child) {
        console.log(this);
        console.log(child);
        child.cc = 'kk'
    }

    render() {
        const props = this.props;
        const allProps = { ...props, form: () => { return this.context.form; }, form2: this.form, form3: this.context, form4: this.context.form };
        Object.defineProperty(this, 'form2', {
            get: function() {
                return this._form;
            }
        });
        Object.defineProperty(this, 'forms2', {
            get: function() {
                return this._forms;
            }
        });
        this.form = () => this._form;
        const Comp = ComposedComponent;
        const cc = <Comp {...this.props} form={this.form} xform={this.formx} forms={this._forms} forms2={this.forms2} parent={this} />;
        return cc;
    }
};


export default ComposedForm;