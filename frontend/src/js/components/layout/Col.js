import React from 'react';

export default props => {
    const { size = '12', className = '', children, ...restProps } = props;

    const classNames = [];

    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(s => {
        const value = props[s];

        if (value) {
            classNames.push(`${s}:col-end-${value}`);
        }
    });

    if (!classNames.length) {
        classNames.push(`col-span-${size}`);
    }

    classNames.unshift(className);

    return (
        <div {...restProps} className={classNames.join(' ')}>
            {children}
        </div>
    );
};
