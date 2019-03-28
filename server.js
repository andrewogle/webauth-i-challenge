const express = require("express");
const userRouter = require("./router/userRouter");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

server.use(express.json());

server.use(cors());
server.use(helmet());
server.use("/",userRouter);

server.get("/", async (req, res) => {
    res.send("Hello");
  });

module.exports = server;