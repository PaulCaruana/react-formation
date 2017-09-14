import React, { Component } from 'react';
import { RadioButton } from 'material-ui/RadioButton';

class compositeComponent extends Component {
    render() {
        const styles = {
            radioButton: {
                marginTop: 16,
            },
        };
        console.log('ok')
        return (
            <RadioButton
                label="yy"
                style={styles.radioButton}
                {...this.props}
            />
        );
    }
}

export default compositeComponent;