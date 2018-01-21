import TextField from 'material-ui/TextField';
import { Field } from 'react-formation';

const mapper = {
    type: 'password',
    hintText: props => props.placeholder,
    floatingLabelText: props => props.label,
    placeholder: null
};
export default Field(TextField, mapper);

