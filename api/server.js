const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const apiRouter = require('./apiRouter.js');
const userRouter = require('../users/user-router');
const authRouter = require('../auth/auth-router');
const helmet = require('helmet');
const cors = require('cors');
const dbConnection = require('../database/dbConfig');
const server = express();

const sessionConfig = {
    name: "don't look at me!", // default is connect.sid
    secret: process.env.SESSION_SECRET || 'nobody tosses a dwarf!',
    cookie: {
        maxAge: 1000 * 30,
        secure: false, // only set cookies over https. Server will not send back a cookie over http. Set to true for production
    }, // 30 seconds in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: true, // must be set to false per GDPR compliance
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 60000,
    }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api', apiRouter);
server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);


module.exports = server;