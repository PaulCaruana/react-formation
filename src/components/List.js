import React from 'react';

export default function List(items) {
    if (!items) {
        return null;
    }

    return (
        <div>
            {items.map((item, i) => <div key={i} todo={item} />)}
        </div>
    );
}