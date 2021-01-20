'use strict';

module.exports = {
    home: req => {
        const { query: { name } = {}, body } = req;

        let ret = ['Hello', name, 'from the API server'].filter(s => s).join(', ') + '!';

        if (body) {
            ret = [ret, `You sent me a body: '${body}'`].join(' ');
        }

        return ret;
    },
};
