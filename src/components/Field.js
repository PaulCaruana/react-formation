import React, { PropTypes, Component } from 'react';
import Field from 'lib/field';
import simpleList from './SimpleList';

export default ComposedComponent => class extends Component {

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
        this.field = Field(this.props.name, this.props, this);
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

    render() {
        return (
            <ComposedComponent
                {...this.props}
                {...this.state}
                value={this.context.values[this.props.name] || ''}
                onChange={this.onChange.bind(this)}
                onBlur={this.onBlur.bind(this)}
                errorText={simpleList(this.field.getVisibleErrors())}
            />
        );
    }
};
