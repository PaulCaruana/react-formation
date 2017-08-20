import React from 'react';

export default function SimpleList(items) {
    if (!items) {
        return null;
    }

    return (
        <div>
            {items.map((item, i) => <div key={i}>{item}</div>)}
        </div>
    );
}