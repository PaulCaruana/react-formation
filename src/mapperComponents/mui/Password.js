import TextField from 'material-ui/TextField';
import { Field } from '../../';

const mapper = {
    type: 'password',
    hintText: props => props.placeholder,
    floatingLabelText: props => props.label,
    placeholder: null
};
export default Field(TextField, mapper);

