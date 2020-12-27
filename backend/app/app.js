'use strict';

const fastify = require('fastify')({logger:true});

fastify.get('/', (req, res) => res.send('Hello world'));

fastify.listen(3000, '0.0.0.0', (err, address) => {
    if(err) {
        throw err;
    }
});
