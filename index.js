const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const commandHandler = require("./slack").commandHandler;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/forkys", function(req, res) {
  commandHandler({ command: 'forkys' }).then(r => res.json(r));
});

app.post("/", function(req, res) {
  const { text } = req.body;

  commandHandler({ command: text }).then(r => res.json(r));
});

module.exports.handler = serverless(app);
