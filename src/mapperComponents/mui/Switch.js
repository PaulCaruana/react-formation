import Toggle from 'material-ui/Toggle';
import { Field } from '../../';

export default Field(Toggle, {
    type: "toggle",
    labelStyle: props => ({ width: 'auto', marginRight: 16 }),
    style: props => ({ marginTop: 16 }),
    onToggle: props => (event, checked) => props.onChange(event, checked),
    toggled: props => props.value || false
});