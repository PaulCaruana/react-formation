import React, { Component } from 'react';

export default function mapProps(pmapper) {
    return ComposedComponent =>
        class MapProps extends Component {
            static ComposedComponent = ComposedComponent;
            
            render() {
                const props = this.props;
                const mappedProps = Object.keys(mapper).reduce((acc, propName) => {
                    return {
                        ...acc,
                        [propName]: mapper[propName](this.props)
                    };
                }, {});
                const allProps = { ...props, ...mappedProps };
                const componentPropNames = Object.keys(ComposedComponent.propTypes) || [];
                const mappedPropNames = Object.keys(mappedProps) || [];
                const validPropNames = componentPropNames.concat(mappedPropNames);
                const componentProps = {};
                Object.keys(allProps).forEach(name => {
                    if (validPropNames.indexOf(name) > -1) {
                        componentProps[name] = allProps[name];
                    }
                });
                return { componentProps };
        }
};
}