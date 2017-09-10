import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import { Conditional, Field } from 'react-formwork';
import pick from 'es6-pick';

class TextInput extends Component {
    render() {
        const FormComponent = TextField;
        return (
            <div>
                <FormComponent
                    {...pick(this.props, ...Object.keys(FormComponent.propTypes))}
                    hintText={this.props.placeholder}
                    floatingLabelText={this.props.label}
                />
            </div>
        );
    }
}

export default Conditional(Field(TextInput));