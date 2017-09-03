import React from 'react';
import TextField from 'material-ui/TextField';
import Conditional from './Conditional';
import Field from './Field';

class TextInput extends React.Component {
    pick(o, attrs) {
        return Object.assign({}, ...attrs.map(attr => ({ [attr]: o[attr] })));
    }

    render() {
        const { data, placeholder, label, ...rest } = this.props;
        const textFieldProps = this.pick(rest, Object.keys(TextField.propTypes));

        return (
            <div>
                <div>
                    <TextField
                        {...textFieldProps}
                        hintText={placeholder}
                        floatingLabelText={label}
                    />
                </div>
            </div>
        );
    }
}

export default Conditional(Field(TextInput));