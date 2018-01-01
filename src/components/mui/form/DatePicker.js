import React, { Component } from 'react';
import DatePickerInternal from './DatePickerInternal';

export default class DatePicker extends Component {
    render() {
        return (
            <div>
               <DatePickerInternal {...this.props} />
            </div>
        );
    }
}
