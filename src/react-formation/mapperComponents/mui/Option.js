import mapProps from 'map-props';
import MenuItem from 'material-ui/MenuItem';

const Option = mapProps({
    primaryText: props => props.label
})(MenuItem);
Option.muiName = 'MenuItem';

export default Option;