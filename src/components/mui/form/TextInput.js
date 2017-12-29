import TextField from 'material-ui/TextField';
import { Field } from 'react-formation';

const mapper = {
    type: 'text',
    hintText: props => props.placeholder,
    floatingLabelText: props => props.label
};
export default Field(TextField, mapper);

