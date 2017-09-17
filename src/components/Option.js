import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import { mapProps } from 'react-formwork';

class Option extends Component {
    render() {
        const mapper = { primaryText: props => props.label };
        const componentProps = mapProps(this.props, mapper)(MenuItem);
        return (
            <MenuItem {...componentProps} />
        );
    }
}

Option.muiName = 'MenuItem';

export default Option;
