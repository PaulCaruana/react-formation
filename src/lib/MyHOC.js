import React from 'react';
import TextField from 'material-ui/TextField';
import HOC from './HOC';
import withCondition from '../utils/withCondition';

class MyComponent extends React.Component {
    pick(o, attrs) {
        return Object.assign({}, ...attrs.map(attr => ({ [attr]: o[attr] })));
    }

    render() {
        const { data, placeholder, label, ...rest } = this.props;
        const textFieldProps = this.pick(rest, Object.keys(TextField.propTypes));
        return (
            <div>
                <h1>{data}</h1>

                <div>
                    <TextField
                        {...textFieldProps}
                        hintText={placeholder}
                        floatingLabelText={label}
                    />
                </div>
            </div>
        );
    }
}

export default withCondition(HOC(MyComponent));