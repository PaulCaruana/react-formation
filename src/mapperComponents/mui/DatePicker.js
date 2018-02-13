import DatePickerInternal from './DatePickerInternal';
import { Field } from '../../';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/fr');
    require('intl/locale-data/jsonp/fa-IR');
}
const formatDate = new DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
}).format;

const mapper = {
    type: 'datePicker',
    autoOk: props => (props.autoOk === undefined) ? true : props.autoOk,
    container: props => props.container || 'inline',
    hintText: props => props.placeholder,
    style: props => ({ marginTop: 16 }),
    value: (props, field) => field.context.values[props.name] || {},
    formatDate:  props => props.container || formatDate,
    onDismiss: props => (event, value) => props.onBlur(event, value),
    placeholder: null
};
export default Field(DatePickerInternal, mapper);

