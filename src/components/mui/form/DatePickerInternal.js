import DatePicker from 'material-ui/DatePicker';
import { Field } from 'react-formation';
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
    autoOk: true,
    container:'inline',
    hintText: props => props.placeholder,
    value: (props, field) => field.context.values[props.name] || {},
    formatDate: () => formatDate,
    placeholder: null
};
export default Field(DatePicker, mapper);

