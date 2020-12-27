'use strict';

const fs = require('fs');
const path = require('path');

const fastify = require('fastify')();

const logger = require('../../shared/util/logger');

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
