import React from 'react';

export default React.createClass({
    render() {
        const { items } = this.props;

        return (
            (items.length)? (
                <div>
                    {items.map((item, i) => <div key={i}>{item}</div>)}
                </div>
            ) : null
        );
    }
});