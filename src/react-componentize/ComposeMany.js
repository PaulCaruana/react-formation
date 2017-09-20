export default function ComposeMany(HOC, baseComponents) {
    return Object.keys(baseComponents).reduce((acc, name) => {
        return {
            ...acc,
            [name]: HOC(baseComponents[name])
        };
    }, {});
}
