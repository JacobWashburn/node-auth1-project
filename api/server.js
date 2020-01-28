const express = require('express');
const apiRouter = require('./apiRouter.js');
const userRouter = require('../user/userRouter')
const helmet = require('helmet');
const cors = require('cors');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', apiRouter);
server.use('/api/users', userRouter);


module.exports = server;