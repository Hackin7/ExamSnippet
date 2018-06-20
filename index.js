var express = require('express');
var app = express();

var fs = require('fs');

app.get('/', function(req.res){
	res.send("hi");
//	res.redirect('/quiz/index.html')
});
app.use(express.static('public'));

var quiz = require('./RESTful_API.js');
app.use('/RESTAPI', quiz);

const port = process.env.PORT || 8080
app.listen(8080);
console.log("Running at localhost:8080");
