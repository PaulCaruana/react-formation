import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import { Conditional, Field } from 'react-formwork';
import pick from 'es6-pick';

class TextInput extends Component {

    static contextTypes = {
        values: PropTypes.object.isRequired
    };

    onToggle(event, checked) {
        this.props.onChange(event, null, checked);
    }

    render() {
        const FormComponent = Toggle;
        const styles = {
            block: {
                maxWidth: 50,
                marginTop: 16,
                marginBottom: 16,
            },
            label: {
                whiteSpace: 'nowrap',
                marginRight: 16,
            }
        };
        return (
            <div style={styles.block}>
                <FormComponent
                    {...pick(this.props, ...Object.keys(FormComponent.propTypes))}
                    labelStyle={styles.label}
                    onToggle={this.onToggle.bind(this)}
                    toggled={this.context.values[this.props.name] || false}
                />
            </div>
        );
    }
}

export default Conditional(Field(TextInput));