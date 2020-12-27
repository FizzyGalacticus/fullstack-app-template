'use strict';

module.exports = {
    home: req => {
        const { query: { name } = {} } = req;

        return ['Hello', name].filter(s => s).join(', ') + '!';
    },
};
