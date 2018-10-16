const serverless = require("serverless-http");
const express = require("express");
const app = express();
const forkysParser = require("./parser/forkys").parse;

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/forkys", function(req, res) {
  forkysParser()
    .then(lunch => res.send(`${lunch.soup}, ${lunch.main}`))
    .catch(err => res.send(err));
});

app.post("/", function(req, res) {
  console.log("Received post with ", req);
  res.send(req);
});

module.exports.handler = serverless(app);
