const express = require("express");
const userRouter = require("./router/userRouter");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const sessionOptions = {
  name: 'Bob',
  seceret: 'do not do this in production',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure : false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  store : new KnexSessionStore({
    knex : require('./data/dbConfig.js'),
    tablename: 'sessions',
    sididfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};



server.use(session(sessionOptions))
server.use(express.json());

server.use(cors());
server.use(helmet());
server.use("/",userRouter);

server.get("/", async (req, res) => {
    res.send("Hello");
  });

module.exports = server;