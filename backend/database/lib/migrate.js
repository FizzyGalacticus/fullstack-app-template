'use strict';

const fs = require('fs').promises;
const path = require('path');

const logger = console;

const getMigrationFunction = (file, direction) => async db => {
    const filePathChunks = [__dirname, '..', 'migrations', 'sqls', `${file}-${direction.toLowerCase()}.sql`];
    const filePath = path.resolve(...filePathChunks);

    const data = await fs.readFile(filePath, { encoding: 'utf-8' });

    logger.warn(`Running db-migrate ${direction} with:`);
    logger.log(data);

    await db.runSql(data);
};

const createMigrationFunctions = file => ({
    up: getMigrationFunction(file, 'up'),
    down: getMigrationFunction(file, 'down'),
});

module.exports = {
    createMigrationFunctions,
};
