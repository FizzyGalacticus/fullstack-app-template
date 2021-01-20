'use strict';

const fs = require('fs');
const path = require('path');

const fastify = require('fastify')();
const fastifyCORS = require('fastify-cors');

fastify.register(fastifyCORS, {
    origin: (origin, cb) => {
        if (/localhost/.test(origin)) {
            //  Request from localhost will pass
            cb(null, true);
            return;
        }

        // Generate an error on other origins, disabling access
        cb(new Error('Not allowed'));
    },
});

const logger = console;

const routesPath = path.join(__dirname, 'routes');

const routeVersionPaths = fs.readdirSync(routesPath);

routeVersionPaths.forEach(routeVersion => {
    const versionRoutePath = path.join(routesPath, routeVersion);

    const versionRoutes = fs.readdirSync(versionRoutePath);

    versionRoutes.forEach(route => {
        const routePath = path.join(versionRoutePath, route);

        const routes = require(routePath);

        routes.forEach(r => fastify.route(r));
    });
});

fastify.listen(3000, '0.0.0.0', (err, address) => {
    if (err) {
        throw err;
    }

    logger.log(`Listening on ${address}`);
});
