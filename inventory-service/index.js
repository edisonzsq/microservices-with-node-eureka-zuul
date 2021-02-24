/**
 * ExpressJS Setups
 */
const express = require('express')
const app = express()
const port = 1040
let bodyParser = require('body-parser');


// This ia a mock quantity store.
let quantity = 100;


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
 * In the callback function, MQTT client subscribes to the specified channel so that 
 * it can receive broadcast message from the channel.
 */
client.on('connect', function(){
  console.log('inventory service connected to public mqtt broker');
  client.subscribe(channelName, function(err){
    console.log('inventory service subscribed to', channelName);
  });
});

/**
 * MQTT client listening to incoming message from the subscribed channel.
 */
client.on('message', (topic, data) => {
  data = JSON.parse(data.toString());
  console.log('BROADCAST MESSAGE RECEIVED. Topic:', topic);
  quantity--;
  console.log('QUANTITY REDUCED BY 1. CURRENT QUANTITY:', quantity, 'Log ID:', data.logId);
});

/**
 * For testing
 */
app.use(bodyParser.json());
app.get('/hello', function (req, res) {
  res.send('Hello Inventory Service')
})

/**
 * Returns the current quantity
 */
app.get('/quantity', function(req, res){
  return res.send({qty:quantity});
});

/**
 * Register this Node instance to Service Discovery node with ID "purchaseservice".
 */
require('./eureka-helper').registerWithEureka('inventoryservice', port);

// Listening to specified port for incoming HTTP Requests.
app.listen(port);