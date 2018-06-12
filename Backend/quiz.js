var express = require('express');
var router = express.Router(); //https://www.tutorialspoint.com/expressjs/expressjs_routing.htm

var fs = require('fs');
var mustache = require('mustache'); //https://github.com/janl/mustache.js/

//https://www.tutorialspoint.com/expressjs/expressjs_form_data.htm
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); // for parsing application/json
router.use(bodyParser.json()); // for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded for parsing multipart/form-data
router.use(upload.array()); 
router.use(express.static('public'));

//
var cookieParser = require('cookie-parser');
var session = require('express-session');
router.use(cookieParser());
router.use(session({secret:"quizzing"}));


function templating(res,filename,object){
   fs.readFile(filename, function (err, data) {
      if (err) {
         console.log(err)// HTTP Status: 404 : NOT FOUND, Content Type: text/plain
         res.writeHead(404, {'Content-Type': 'text/html'});
      }else {	
         res.writeHead(200, {'Content-Type': 'text/html'});	//Page found, HTTP Status: 200 : OK, Content Type: text/plain
         res.write(mustache.render(data.toString(),object));		
      }
  });
}

function findExamQuestion(paper,section, q_id){
	//Dummy Exam Question
	return require("./dummy/dummy_question.json");
}

router.get('/', function(req, res){		   
   //res.send('GET route on things.');
   var question = findExamQuestion(req.params.paper,req.params.section, req.params.q_id);
   req.session.questions = [question,question];
   req.session.questionNo = 0;
   req.session.answers = [];
   req.session.score = 0;
   res.redirect('/quiz/exam_question');
   
});

router.get('/exam_question', function(req, res){
	if (req.session.questions){
		var data = req.session.questions[req.session.questionNo];
		data.question_no = req.session.questionNo + 1; 
		templating(res,'question.html',data);
	}
});

router.post('/marking', function(req, res){
	//console.log(req.session.answers);
	//Data Processing
	var data = req.session.questions[req.session.questionNo];
	
	data.answer = [];
	for (given in req.body){
			var obj = {};
			obj[given] = req.body[given];
			data.answer.push(obj); 
	}
	req.session.answers.push(data.answer);
	
	data.answer = [];
	for (given in req.body){
			data.answer.push({"point":req.body[given]}); 
	}
	//console.log(data.answer);
	
	data.question_no = req.session.questionNo + 1;
	//Self-Marking
	if (data.self_mark === true){
		data.marking_scheme = '';
		var pointNo = 0;
		for (answer in data.correct_answer){
			data.marking_scheme += "<input type='checkbox' value='1' name='point"+String(pointNo)+"' /><span>"+data.correct_answer[answer]+"</span><br>"
			pointNo += 1;
			}
		templating(res,'marking.html',data);
	}
	//Computer Marking
	else {
		for (answer in data.correct_answer){
			if (req.body[answer] == data.correct_answer[answer]){
				req.session.score+=1;
			}
		}
		req.session.questionNo += 1;
		if (req.session.questionNo >= req.session.questions.length){
				res.redirect('/quiz/results');
		}
		else{
			res.redirect('/quiz/exam_question');
		}
   }
});

//Self Marking Tabulation
router.post('/tabulate', function(req, res){
	for (point in req.body){
		if (req.body[point] == '1'){req.session.score += 1;}
	}
	req.session.questionNo += 1;
	if (req.session.questionNo >= req.session.questions.length){
		res.redirect('/quiz/results');
	}
	else{
		res.redirect('/quiz/exam_question');
	}
});

router.get('/results', function(req, res){
	//Data Processing
	var data = {}; 
	data.score = req.session.score;
	data.total = 0;
	for (question in req.session.questions){
		for (point in req.session.questions[question].correct_answer){
			data.total += 1;
		}
	}
	data.questions=req.session.questions;
	data.results = [];
	for (q in req.session.answers){
		console.log(q);
		console.log(req.session.answers[q][0]);
		for(ans in req.session.answers[q][0]){
			console.log(ans);
			console.log(req.session.questions[q].q_id);
			console.log(req.session.questions[q].correct_answer[ans]);
			data.results.push({"question":req.session.questions[q].q_id});
			data.results.push({"answer":req.session.answers[q][0][ans]});
			data.results.push({"marking_scheme":req.session.questions[q].correct_answer[ans]});
		}
	}
	templating(res,'results.html',data);
	console.log(req.session); //Debugging
});

//export this router to use in our index.js
module.exports = router;
