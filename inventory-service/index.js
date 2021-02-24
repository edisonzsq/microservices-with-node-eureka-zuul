const express = require('express')
const app = express()
const port = 1040
let bodyParser = require('body-parser');
let mqtt = require('mqtt')
let client  = mqtt.connect('mqtt://test.mosquitto.org')
const subscription = "SU-SD-45-WORKSHOP-"+"YOUR_NAME";
let quantity = 100;

client.on('connect', function(){
  console.log('inventory service connected to public mqtt broker');
  client.subscribe(subscription, function(err){
    console.log('inventory service subscribed to', subscription);
  });
});

client.on('message', (topic, msg) => {
  msg = msg.toString();
  console.log('purchase messsage received', topic);
  quantity--;
  console.log('quantity deducted by 1. it is now', quantity);
});



app.use(bodyParser.json());
app.get('/hello', function (req, res) {
  res.send('Hello Inventory Service')
})

app.get('/quantity', function(req, res){
  return res.send({qty:quantity});
});

require('./eureka-helper').registerWithEureka('inventoryservice', port);


app.listen(port);