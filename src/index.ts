// TypeORM requirement
import 'reflect-metadata';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

import { DBconnection } from './database';
import express from 'express';

const app = express();

DBconnection.then(async connection => {

    console.log(`\x1b[42m[OK]\x1b[0m SUCCESSFUL DATABASE CONNECTION\n`);

    // Local import
    const { router } = await import('./routers');

    app.use(express.json());
    app.use(router);

    app.listen(process.env.PORT || 3333, () => {
        console.log(
            `\x1b[42m[OK]\x1b[0m API IS RUNNING AT http://127.0.0.1:${process.env.PORT || 3333}\n\n`
        );
    })

}).catch(e => {
    console.log(
        `\x1b[41m[ERROR]\x1b[0m DATABASE CONNECTION FAILED: ${e}\n`
    );
});