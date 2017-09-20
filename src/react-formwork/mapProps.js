import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function mapProps(props, mapper) {
    return ComposedComponent => {
        const mappedProps = Object.keys(mapper).reduce((acc, propName) => {
            const mapValue = mapper[propName];
            const propValue = (typeof mapValue === 'function') ? mapValue(props) : mapValue;
            return {
                ...acc,
                [propName]: propValue
            };
        }, {});
        const allProps = { ...mappedProps, ...props };
        if (mappedProps.children) {
            allProps.children = mappedProps.children;
        }
        const componentPropNames = Object.keys(ComposedComponent.propTypes) || [];
        const mappedPropNames = Object.keys(mappedProps) || [];
        const validPropNames = componentPropNames.concat(mappedPropNames);
        const componentProps = {};
        Object.keys(allProps).forEach(name => {
            if (validPropNames.indexOf(name) > -1) {
                componentProps[name] = allProps[name];
            }
        });
        return componentProps;
    };
};