var express = require('express');
var router = express.Router(); 

// Database
/*
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ExamSnippet";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
*/

var inArray = function(item,array){
	for (i in array){
		if (array[i] == item){return true;}
	}
	return false;
};

//https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array?lq=1
//var item = items[Math.floor(Math.random()*items.length)];
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        return arr//throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x]; //If thing already inside, replace with same thing
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

//https://gist.github.com/kethinov/6658166
var fs = require('fs');
var loadQuestions = function(){
	var path = "../Questions/";
	var subjects = fs.readdirSync(path);
	var questionTree = {};
	var topicsTree = {};
	for (i in subjects){ // Subjects
		questionTree[subjects[i]] = {};
		topicsTree[subjects[i]] = [];
		var papers = fs.readdirSync(path+subjects[i]+"/");
		for (j in papers){ // Papers
			console.log(path+subjects[i]+"/"+papers[j]+"/index.json");
			var paperData = require(path+subjects[i]+"/"+papers[j]+"/index.json");
			questionTree[subjects[i]][paperData.paper] = paperData;
			// Topics ///////////////////////////////////////////////
			for (k in paperData.questions){ // Topics
				for (l in paperData.questions[k].topics){
					if (!inArray(paperData.questions[k].topics[l],topicsTree[subjects[i]])){
						topicsTree[subjects[i]].push(paperData.questions[k].topics[l]);
					}
				}
			}/////////////////////////////////////////////////////
		}
	}
	return {subjects:subjects, questionTree:questionTree, topicsTree: topicsTree};
};


// Debugging
/*
var data = loadQuestions(); 
console.log(data.topicsTree);
console.log(data.questionTree);
console.log(data.questionTree["Test_Subject"]["Test_Paper"]);
*/

router.get('/', function(req, res){	
	var data = loadQuestions();
	res.end("Hi");	   
});

router.get('/list', function(req, res){		   
	var data = loadQuestions();
	res.json(data.subjects);
	res.end();
});

router.get('/list/:subject', function(req, res){		   
	var data = loadQuestions();
	var papers = [];
	for (i in data.questionTree[req.params.subject]){
		papers.push(data.questionTree[req.params.subject][i])
	}
	res.json(papers);	   
	res.end();
});

router.get('/list/:subject/:paper', function(req, res){		   
	var data = loadQuestions();
	var questions = [];
	for (i in data.questionTree[req.params.subject][req.params.paper].questions){
		questions.push(data.questionTree[req.params.subject][req.params.paper].questions[i])
	}
	res.json(questions);
	res.end()
});

router.get('/topics/:subject', function(req, res){		   
	var data = loadQuestions();
	res.json(data.topicsTree[req.params.subject]);	   
	res.end();
});

router.get('/random/:subject/:type/:topic/:quantity', function(req, res){		   
	var data = loadQuestions();
	var possibleQuestions = [];
	for (i in data.questionTree[req.params.subject]){ // Papers
		for (j in data.questionTree[req.params.subject][i].questions){ // Questions
			console.log([i,j]);
			var question = data.questionTree[req.params.subject][i].questions[j];
			//Debugging
			if (question.type == req.params.type){
				for (v in question.topics){
					if (question.topics[v] == req.params.topic){
						possibleQuestions.push(question);
						}
				}
			}
		}
	}
	res.json(getRandom(possibleQuestions, req.params.quantity));//possibleQuestions);
	res.end();	   
});

router.get('/update', function(req, res){
});

router.post('/log/quizattempt', function(req, res){
});

//export this router to use in our index.js
module.exports = router;
