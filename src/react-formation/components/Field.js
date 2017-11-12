import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldController from './controllers/field';
import SimpleList from './SimpleList';
import mapProps from '../mapProps';

export default (BaseComponent, propertyMapper = null) => class extends Component {

    static contextTypes = {
        reset: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        registerChild: PropTypes.func.isRequired
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        label: PropTypes.string,
        validate: PropTypes.arrayOf(PropTypes.string)
    };

    componentWillMount() {
        this.field = FieldController(this.props.name, this.props, this);
        this.form = this.context.registerChild(this.field);
        if (this.props.defaultValue && this.context.values[this.props.name] === undefined) {
            this.context.update(this.props.name, this.props.defaultValue);
        }
    }

    componentDidMount() {
        this.field.validate(this.context.values[this.props.name]);
    }

    componentWillUnmount() {
        console.log("field dismount")
        //this.context.removeChild(this.field);
    }

    onToggle(event, value) {
        this.onChange(event, null, value);
    }

    onChange(event, index, value) {
        const fieldValue = (value !== undefined) ? value : event.target.value;
        this.context.update(this.props.name, fieldValue);
        this.field.onChange(fieldValue);
    }

    onBlur(event, index, value) {
        const fieldValue = value || event.target.value;
        this.field.onBlur(fieldValue);
    }

    render() {
        const baseProps = this.props;
        const fieldProps = {
            value: this.context.values[this.props.name] || '',
            onChange: this.onChange.bind(this),
            onBlur: this.onBlur.bind(this),
            errorText: SimpleList(this.field.getVisibleErrors()),
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
        const baseComponentProps = mapProps(props, mappedProps)(BaseComponent);
        return (
            <div>
                <BaseComponent {...baseComponentProps} />
            </div>
        );
    }
};
