import React from 'react';
import TextField from 'material-ui/TextField';
import Conditional from './Conditional';
import Field from './Field';
import componentProps from 'verity/componentProps';

class TextInput extends React.Component {
    render() {
        const props = componentProps(TextField, this.props)
        return (
            <div>
                <div>
                    <TextField
                        hintText={this.props.placeholder}
                        floatingLabelText={this.props.label}
                        {...props}
                    />
                </div>
            </div>
        );
    }
}

export default Conditional(Field(TextInput));