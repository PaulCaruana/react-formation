import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function mapProps(props, mapper) {
    return ComposedComponent => {
        const mappedProps = Object.keys(mapper).reduce((acc, propName) => {
            return {
                ...acc,
                [propName]: mapper[propName](props)
            };
        }, {});
        const allProps = { ...mappedProps, ...props };
/*
        const mappedChildren = mappedProps.children;
        const children = props.children;
        if (mappedChildren) {
            allProps.children = children.map(child => {
                const childProps = child.props;
                const newChildProps = { ...mappedChildren, ...childProps };
                const newChild = child;
                newChild.props = { ...newChildProps };
                return newChild;
            });
        }
*/
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