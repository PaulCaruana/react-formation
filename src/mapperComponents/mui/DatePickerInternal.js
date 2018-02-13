import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import PropTypes from 'prop-types';

export default class DatePickerInternal extends Component {
    render() {
        return (
            <div>
                <DatePicker {...this.props} />
            </div>
        );
    }
}

DatePickerInternal.propTypes = DatePicker.propTypes;
DatePickerInternal.propTypes.errorText = PropTypes.object;

