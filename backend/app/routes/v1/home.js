'use strict';

const controller = require('../../controllers/v1/home');

const routes = [
    {
        method: ['GET', 'POST'],
        url: '/',
        handler: controller.home,
    },
];

module.exports = routes;
