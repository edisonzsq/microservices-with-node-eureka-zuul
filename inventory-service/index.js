const express = require('express')
const app = express()
const port = 1040
let bodyParser = require('body-parser');
let ioProm  = require('express-socket.io');
let server  = ioProm.init(app);

let quantity = 0;

app.use(bodyParser.json());
app.get('/hello', function (req, res) {
  res.send('Hello Inventory Service')
})

app.get('/quantity', function(req, res){
  return res.send({qty:quantity});
});

require('./eureka-helper').registerWithEureka('inventoryservice', port);

app.listen(port);