import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldController from './fieldController';
import SimpleList from './SimpleList';
import mapProps from './mapProps';

export default (RawComponent, propertyMapper) => class extends Component {

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
/*

    composedComponentProps(props) {
        const componentProps = {};
        const rawComponent = RawComponent.DecoratedComponent || RawComponent;
        const rawComponentPropNames = Object.keys(rawComponent.propTypes) || [];
        const componentPropNames = rawComponentPropNames.concat(propNames);
        Object.keys(props).forEach(name => {
            if (componentPropNames.indexOf(name) > -1) {
                componentProps[name] = props[name];
            }
        });
        return componentProps;
    }

*/

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
        this.context.removeChild(this.field);
    }

    onChange(event, index, value) {
        const fieldValue = (value !== undefined) ? value : event.target.value
        this.context.update(this.props.name, fieldValue);
        this.field.onChange(fieldValue);
    }

    onBlur(event, index, value) {
        const fieldValue = value || event.target.value;
        this.field.onBlur(fieldValue);
    }

    render() {
        const rawProps = this.props;
        const props = {
            ...rawProps,
            value: this.context.values[this.props.name] || '',
            onChange: this.onChange.bind(this),
            onBlur: this.onBlur.bind(this),
            errorText: SimpleList(this.field.getVisibleErrors())
        };
        const componentProps = mapProps(props, propertyMapper)(RawComponent);
        return (
            <div>
                <RawComponent {...componentProps} />
            </div>
        );
    }
};
