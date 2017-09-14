import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { Conditional, Field } from 'react-formwork';
import pick from 'es6-pick';

class CheckBox extends Component {

    static contextTypes = {
        values: PropTypes.object.isRequired
    };

    onChecked(event, checked) {
        this.props.onChange(event, null, checked);
    }

    render() {
        const FormComponent = Checkbox;
/*
        const styles = {
            block: {
                maxWidth: 50,
                marginTop: 16,
                marginBottom: 16,
            }
        };
*/
        const styles = {
            block: {
                maxWidth: 250,
            },
            checkbox: {
                marginBottom: 16,
            },
        };
        return (
            <div style={styles.block}>
                <FormComponent
                    label={this.props.label}
                    style={styles.checkbox}
                    {...pick(this.props, ...Object.keys(FormComponent.propTypes))}
                    onCheck={this.onChecked.bind(this)}
                    checked={this.context.values[this.props.name] || false}
                />
            </div>
        );
    }
}

export default Conditional(Field(CheckBox));