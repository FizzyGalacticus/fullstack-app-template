import React from 'react';

export default props => {
    const { children, className = '', ...rest } = props;

    return (
        <div {...rest} className={`${className} grid gap-2 grid-cols-12`}>
            {children}
        </div>
    );
};
