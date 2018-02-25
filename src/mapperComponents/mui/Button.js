import mapProps from 'map-props';
import RaisedButton from 'material-ui/RaisedButton';


const Button = mapProps({
    style: props => ({ marginTop: 16 }),
})(RaisedButton);


export default Button;
