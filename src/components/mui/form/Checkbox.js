import Checkbox from 'material-ui/Checkbox';
import { Field } from 'react-formation';

export default Field(Checkbox, {
    label: props => props.label,
    style: props => ({ marginTop: 16 }),
    onCheck: props => (event, checked) => props.onChange(event, null, checked),
    checked: props => props.value || false
});