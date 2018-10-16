const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.post("/", function(req, res) {
  console.log("Received post with ", req);
  res.send(req);
});

module.exports.handler = serverless(app);
