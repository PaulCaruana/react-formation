import Toggle from 'material-ui/Toggle';
import { Field } from 'react-formwork';

export default Field(Toggle, {
    labelStyle: props => ({ width: 'auto', marginRight: 16 }),
    style: props => ({ marginTop: 16 }),
    onToggle: props => (event, checked) => props.onChange(event, null, checked),
    toggled: props => props.value || false
});