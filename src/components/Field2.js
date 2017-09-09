import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldController from 'verity/FieldController';
import SimpleList from './SimpleList';

export default (ComposedComponent, mapProps = {}) => class extends Component {

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
    }

    componentDidMount() {
        this.field.validate(this.context.values[this.props.name]);
    }

    componentWillUnmount() {
        this.context.removeChild(this.field);
    }

    onChange(event) {
        this.context.update(this.props.name, event.target.value);
        this.field.onChange(event.target.value);
    }

    onBlur(event) {
        this.field.onBlur(event.target.value);
    }

    getComponentProps() {
        const componentProps = {};
        const componentPropsList = Object.keys(ComposedComponent.propTypes);
        Object.keys(this.props).forEach(key => {
            if (mapProps[key]) {
                const mappedKey = mapProps[key];
                componentProps[mappedKey] = this.props[key];
            } else if (componentPropsList.indexOf(key) > -1) {
                componentProps[key] = this.props[key];
            }
        });
        return componentProps;
    }

    render() {
        const componentProps = this.getComponentProps();
        return (
            <ComposedComponent
                {...componentProps}
                value={this.context.values[this.props.name] || ''}
                onChange={this.onChange.bind(this)}
                onBlur={this.onBlur.bind(this)}
                errorText={SimpleList(this.field.getVisibleErrors())}
            />
        );
    }
};
