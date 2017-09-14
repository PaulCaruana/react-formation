import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButtonGroup } from 'material-ui/RadioButton';
import { Conditional, Field } from 'react-formwork';
import pick from 'es6-pick';

class compositeComponent extends Component {

    static contextTypes = {
        values: PropTypes.object.isRequired
    };

    onChange(event, value) {
        this.props.onChange(event, null, value);
    }

    render() {
        const FormComponent = RadioButtonGroup;
        const styles = {
            block: {
                maxWidth: 250,
            },
            radioButton: {
                marginBottom: 16,
            },
        };
        return (
            <div style={styles.block}>
                <FormComponent
                    {...pick(this.props, ...Object.keys(FormComponent.propTypes))}
                    onChange={this.onChange.bind(this)}
                    valueSelected={this.context.values[this.props.name]}
                />
            </div>
        );
    }
}

export default Conditional(Field(compositeComponent));