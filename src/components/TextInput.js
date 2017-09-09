import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Conditional from 'react-formwork/Conditional';
import Field from 'react-formwork/Field';
import componentProps from 'react-formwork/componentProps';

class TextInput extends Component {
    render() {
        const FormComponent = TextField;
        return (
            <div>
                <FormComponent
                    hintText={this.props.placeholder}
                    floatingLabelText={this.props.label}
                    {...componentProps(FormComponent, this.props)}
                />
            </div>
        );
    }
}

export default Conditional(Field(TextInput));