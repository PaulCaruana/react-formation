import React, { Component } from 'react';
import { RadioButton } from 'material-ui/RadioButton';

class compositeComponent extends Component {
    render() {
        const styles = {
            radio: {
                marginTop: 16,
            },
        };
        return (
            <RadioButton
                style={styles.radio}
                {...this.props}
            />
        );
    }
}
export default compositeComponent;