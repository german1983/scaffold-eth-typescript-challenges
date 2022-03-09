import 'reflect-metadata';
import config from './config';
import loaders from './api/loaders';
import express from 'express';
async function startServer() {
    const app = express();

    await loaders({ expressApp: app });

    app.listen(config.port, () => {
        console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    }).on('error', err => {
        console.log(err);
        process.exit(1);
    });
}

startServer();
