var express = require('express');
var app = express();

var fs = require('fs');
//var bodyParser = require('body-parser');
//var multer = require('multer');
//var upload = multer();

app.use(express.static('public'));
/*
app.get('/', function(req,res){
  fs.readFile('../Webpages/index.html', function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         res.writeHead(404, {'Content-Type': 'text/html'});
      }else {	
         //Page found	  
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         res.writeHead(200, {'Content-Type': 'text/html'});	
         
         // Write the content of the file to response body
         res.write(data.toString());		
      }
      // Send the response body 
      res.end();
   });   
});

// for parsing application/json
//app.use(bodyParser.json());
// for parsing application/xwww-
//app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

//for parsing multipart/form-data
//app.use(upload.array());

app.post('/', function(req, res){
  console.log(req.body);
  res.send(req.body);
  //res.send("Recieved your request!");
});
*/ 

var quiz = require('./RESTful_API.js');
app.use('/RESTAPI', quiz);


app.listen(3000);
console.log("Running at localhost:3000");
