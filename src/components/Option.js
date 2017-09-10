import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import pick from 'es6-pick';

class Option extends Component {
    render() {
        const FormComponent = MenuItem;
        return (
            <MenuItem
                {...pick(this.props, ...Object.keys(FormComponent.propTypes))}
                primaryText={this.props.label}
            />
        );
    }
}

Option.muiName = 'MenuItem';

export default Option;
