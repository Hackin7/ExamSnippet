var express = require('express');
var app = express();

var fs = require('fs');

app.use(express.static('public'));

var quiz = require('./RESTful_API.js');
app.use('/RESTAPI', quiz);


app.listen(3000);
console.log("Running at localhost:3000");
