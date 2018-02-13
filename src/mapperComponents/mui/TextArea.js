import TextArea from 'material-ui/TextField';
import { Field } from '../../';

const mapper = {
    type: "textArea",
    hintText: props => props.placeholder,
    floatingLabelText: props => props.label,
    multiLine: true,
    rows: props => props.rows || 2,
    rowsMax: props => props.rowsMax || 4,
    placeholder: null
};
export default Field(TextArea, mapper);
