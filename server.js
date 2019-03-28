const express = require("express");
const router = require("./router/userRouter");
const helmet = require("helmet");
const cors = require("cors");

server.use(express.json());

server.use(cors());
server.use(helmet());
server.use("/",router);

module.exports.server;