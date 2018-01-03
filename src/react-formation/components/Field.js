import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldController from './controllers/field';
import SimpleList from './SimpleList';
import mapProps from '../mapProps';
import equals from 'fast-deep-equal';


export default (BaseComponent, propertyMapper = null) => class extends Component {

    static contextTypes = {
        reset: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired,
        formStatus: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        registerChild: PropTypes.func.isRequired,
        config: PropTypes.object
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        label: PropTypes.string,
        validate: PropTypes.arrayOf(PropTypes.string)
    };
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentWillMount() {
        this.type = (propertyMapper)? propertyMapper.type : null;
        const { ...props } = this.props;
        props.type = this.type;
        this.field = FieldController(this.props.name, props, this);
        this.form = this.context.registerChild(this.field);
        const defaultValue = this.props.defaultValue || this.props.defaultChecked;
        if (defaultValue !== undefined
            && this.context.values[this.props.name] === undefined) {
            this.context.update(this.props.name, defaultValue);
        }
        this.field.validate(this.context.values[this.props.name]);
    }

    componentWillUnmount() {
        this.form.removeChild(this.field);
    }

    shouldComponentUpdate (newProps, newState) {
        console.log(newProps.name, this.field.$renderPending);
        return (this.field.$renderPending || !equals(this.props, newProps) || !equals(this.state, newState));
    }

    onToggle(event, value) {
        this.onChange(event, value);
    }

    onChange(event, value) {
        const validInput = (event && event.target && event.target.validity) ? event.target.validity.valid : true;
        const fieldValue = (value !== undefined) ? value : event.target.value;
        if (validInput) {
            this.context.update(this.props.name, fieldValue);
            this.field.onChange(fieldValue);
        }
    }

    onBlur(event, value) {
        const fieldValue = value || (event && event.target.value) || null;
        this.field.onBlur(fieldValue);
    }

    render() {
        const baseProps = this.props;
        const fieldProps = {
            value: this.context.values[this.props.name] || '',
            onChange: this.onChange,
            onBlur: this.onBlur,
            errorText: SimpleList(this.field.getVisibleErrors())
        };
        let props;
        let mappedProps;
        if (propertyMapper) {
            props = { ...baseProps, ...fieldProps };
            mappedProps = propertyMapper;
        } else {
            props = fieldProps;
            mappedProps = baseProps;
        }
        this.type = mappedProps.type;
        const customProps = Object.keys(this.context.config.validators);
        const baseComponentProps = mapProps(props, mappedProps, customProps, this)(BaseComponent);
        this.field.$renderPending = false;
        return (
            <div>
                <BaseComponent {...baseComponentProps} />
            </div>
        );
    }
};
