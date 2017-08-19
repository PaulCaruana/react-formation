import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField'
import list from './List';
import Field from 'lib/field';

export default class Text extends Component {
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

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.field = Field(this.props.name, this.props, this);
        this.form = this.context.registerChild(this.field);
    }

    componentWillUnmount() {
        this.context.removeChild(this.field);
    }

    componentDidMount() {
        this.field.validate(this.context.values[this.props.name]);
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
            <div>
                <TextField
                    hintText={this.props.placeholder}
                    floatingLabelText={this.props.label}
                    value={this.context.values[this.props.name] || ''}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    errorText={list(this.field.getVisibleErrors())}
                    />
            </div>
        );
    }
}
