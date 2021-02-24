/**
 * ExpressJS Setups
 */
const express = require("express");
const app = express();
const port = 1030;
let bodyParser = require("body-parser");

// This is a mocked records store for purchase and refund records.
let records = [];


/**
 * We are using a public broker for MQTT for inter-service communications via message queue.
 * In actual production, you would have a private broker as an individual service, registered with
 * the Service Discovery node. Then, each services can retrieve the actual broker address from the service discovery.
 */
let mqtt = require('mqtt')
let client  = mqtt.connect('mqtt://test.mosquitto.org')
const channelName = "SU-SD-45-WORKSHOP-"+"YOUR_NAME"; // Pls replace the second string with your name to create a unique channel


/**
 * Connects to the MQTT broker. Upon connect, a callback function will be executed.
 */
client.on('connect', function(){
  console.log('purchase service connected to public mqtt broker');
});

/**
 * For testing
 */
app.use(bodyParser.json());
app.get("/hello", function (req, res) {
  res.send("Hello Purchase Service");
});

/**
 * Register this Node instance to Service Discovery node with ID "purchaseservice".
 */
require("./eureka-helper").registerWithEureka("purchaseservice", port);


/**
 * When POST /buy request is sent, add a purchase record and broadcast message through the channel connected by MQTT, so that
 * whoever that subscribes to this channel will receive the message indicating a purchase order has been processed.
 */
app.post("/buy", function (req, res) {
  let data = { action: "purchase", product: "apple", quantity: 1 };
  records.push(data);
  console.log("PURCHASE RECEIVED")
  client.publish(channelName, JSON.stringify(data));
  console.log("PURCHASE PROCESS COMPLETED. BROADCAST MESSAGE FOR INVENTORY SERVICE.");
  return res.send(records);
});

// Listening to specified port for incoming HTTP Requests.
app.listen(port);