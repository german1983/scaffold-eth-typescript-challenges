import 'reflect-metadata'; // We need this in order to use @Decorators
import config from './config';
import loaders from './api/loaders';
import express from 'express';
async function startServer() {
    const app = express();

    /**
     * A little hack here
     * Import/Export can only be used in 'top-level code'
     * Well, at least in node 10 without babel and at the time of writing
     * So we are using good old require.
     **/
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

// var express = require("express");
// var config = require('./config');
// const app = express()
// const PORT: string | number = process.env.PORT || 5000;

// app.use("*", (req, res) => {
//     res.send("<h1>Welcome to your simple server! Awesome right</h1>");
// });

// require('./loaders').default({ expressApp: app });

// app.listen(config.port, () => {
    //     console.log(`
    //       ################################################
    //       🛡️  Server listening on port: ${config.port} 🛡️
    //       ################################################
    //     `);
    // }).on('error', err => {
        //     console.log(err);
//     process.exit(1);
// });

// app.listen(PORT, () => console.log(`hosting @${PORT}`));