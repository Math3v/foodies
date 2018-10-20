const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const { commandHandler } = require("./slack");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const defaultResponse = {
  mrkdwn: true,
  response_type: "in_channel",
  text: "Sorry, something went wrong."
};

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/forkys", function(req, res) {
  commandHandler({ command: "forkys" }).then(response =>
    res.json({
      ...defaultResponse,
      ...response
    })
  );
});

app.get("/lod", function(req, res) {
  commandHandler({ command: "lod" }).then(response =>
    res.json({
      ...defaultResponse,
      ...response
    })
  );
});

app.post("/", function(req, res) {
  const { text } = req.body;

  commandHandler({ command: text }).then(response =>
    res.json({
      ...defaultResponse,
      ...response
    })
  );
});

module.exports.handler = serverless(app);
