export default function mapProps(props, mapper, field) {
    const mappedProps = Object.keys(mapper).reduce((acc, propName) => {
        const mapValue = mapper[propName];
        const propValue = (typeof mapValue === 'function') ? mapValue(props, field) : mapValue;
        return { ...acc, [propName]: propValue };
    }, {});
    const allProps = { ...props, ...mappedProps };
    if (mappedProps.children) {
        allProps.children = mappedProps.children;
    }
    return allProps;
};