import TextField from 'material-ui/TextField';
import { Field } from 'react-formation';

export default Field(TextField, {
    hintText: props => props.placeholder,
    floatingLabelText: props => props.label
});