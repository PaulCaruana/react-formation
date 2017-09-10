import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Option from './Option';
import { Conditional, Field } from 'react-formwork';
import pick from 'es6-pick';

class SelectBox extends Component {
    listOptions() {
        const items = this.props.items;
        if (!items) {
            return this.props.children;
        }

        const options = items.map((item, i) => {
                const key = item.key || item.value;
                const value = item.value || i + 1;
                const label = item.label || item.value;
                return (
                    <Option key={key} value={value} label={label} />
                );
            }
        );
        return options;
    }

    render() {
        const FormComponent = SelectField;
        return (
            <div>
                <FormComponent
                    {...pick(this.props, ...Object.keys(FormComponent.propTypes))}
                    hintText={this.props.placeholder}
                    floatingLabelText={this.props.label}
                >
                    {this.listOptions()}
                </FormComponent>
            </div>
        );
    }
}

export default Conditional(Field(SelectBox));