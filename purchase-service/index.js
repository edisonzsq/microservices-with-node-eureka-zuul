const express = require("express");
const app = express();
const port = 1030;
let bodyParser = require("body-parser");
let records = [];
let mqtt = require('mqtt')
let client  = mqtt.connect('mqtt://test.mosquitto.org')
const subscription = "SU-SD-45-WORKSHOP-"+"YOUR_NAME";

client.on('connect', function(){
  console.log('purchase service connected to public mqtt broker');
});

app.use(bodyParser.json());
app.get("/hello", function (req, res) {
  res.send("Hello Purchase Service");
});

require("./eureka-helper").registerWithEureka("purchaseservice", port);

app.post("/buy", function (req, res) {
  let data = { action: "purchase", product: "apple", quantity: 1 };
  records.push(data);
  client.publish(subscription, JSON.stringify(data));
  console.log("purchase topic published");
  return res.send(records);
});


app.listen(port);