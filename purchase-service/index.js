const express = require("express");
const app = express();
const port = 1030;
let bodyParser = require("body-parser");
let records = [];

app.use(bodyParser.json());
app.get("/hello", function (req, res) {
  res.send("Hello Purchase Service");
});

require("./eureka-helper").registerWithEureka("purchaseservice", port);

app.post("/buy", function (req, res) {
  let data = { action: "purchase", product: "apple", quantity: 1 };
  records.push(data);
  
  return res.send(records);
});


app.listen(port);