import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Conditional from './Conditional';
import Field from './Field';
import componentProps from 'verity/componentProps';

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