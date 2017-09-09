import React from 'react';

export default function getComponentProps(component, props) {
    const componentProps = {};
    const componentPropsList = Object.keys(component.propTypes);
    Object.keys(props).forEach(key => {
        if (componentPropsList.indexOf(key) > -1) {
            componentProps[key] = props[key];
        }
    });
    return componentProps;
}
/*


export default Component => class extends React.Component {

    render() {
        const componentProps = {};
        const componentPropsList = Object.keys(Component.propTypes);
        Object.keys(this.props).forEach(key => {
            if (componentPropsList.indexOf(key) > -1) {
                componentProps[key] = this.props[key];
            }
        });
        return (
            <Component {...componentProps} />
        );
    }
};
*/
