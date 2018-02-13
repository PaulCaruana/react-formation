import TimePicker from 'material-ui/TimePicker';
import { Field } from '../../';
import PropTypes from 'prop-types';

const mapper = {
    type: 'timePicker',
    autoOk: props => (props.autoOk === undefined) ? true : props.autoOk,
    format: props => props.format || '24hr',
    style: props => ({ marginTop: 16 }),
    hintText: props => props.placeholder,
    value: (props, field) => field.context.values[props.name] || {},
    onDismiss: props => (event, value) => props.onBlur(event, value),
    placeholder: null
};
export default Field(TimePicker, mapper);

TimePicker.propTypes.errorText = PropTypes.object;