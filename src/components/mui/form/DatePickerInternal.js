import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import PropTypes from 'prop-types';

export default class DatePickerInternal extends Component {
    render() {
        const errorStyle = {
            marginTop: '16px',
            position: 'relative',
            bottom: '15px',
            fontSize: '12px',
            fontFamily: 'Roboto, sans-serif',
            lineHeight: '12px',
            color: 'rgb(244, 67, 54)',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
        };
        console.log('text', this.props.errorText)
        return (
            <div>
                <DatePicker {...this.props} />
                {this.props.errorText != null &&
                <div style={errorStyle}>
                    <div>
                        <div>{this.props.errorText}</div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

DatePickerInternal.propTypes = DatePicker.propTypes;
DatePickerInternal.propTypes.errorText = PropTypes.object;

