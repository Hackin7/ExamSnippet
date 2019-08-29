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

var haveEscapeCharacters = function(string){
    escapeCharacters = ["\r","\n"]
    return inArray(string.slice(-1),escapeCharacters)
}

//https://gist.github.com/kethinov/6658166
var fs = require('fs');
var loadQuestions = function(){
    var path = "./Questions/";
    /*fs.rmdir(path+'.*', (err) => {
      if (err) throw err;
      console.log('Questions/.DS_Store was deleted');
    });*/
    var subjects = fs.readdirSync(path);
    var questionTree = {};
    var topicsTree = {"Chemistry":["Periodic Table","Organic Chemistry"], "Test_Subject":["t1","t2","t3"]};//{};
    //console.log(subjects); //Debugging
    for (var i = 0; i < subjects.length; i++){ // Subjects
        console.log(subjects[i]); // Debugging
        questionTree[subjects[i]] = {};
        topicsTree[subjects[i]] = [];
        var papers = fs.readdirSync(path+subjects[i]+"/");
        for (j in papers){ // Papers
            //console.log(path+subjects[i]+"/"+papers[j]+"/index.json");
            var paperData = require(path+subjects[i]+"/"+papers[j]+"/index.json");
            questionTree[subjects[i]][paperData.paper] = paperData;
            //Remove escape characters
            if ( haveEscapeCharacters(questionTree[subjects[i]][paperData.paper].paper) ){
                        questionTree[subjects[i]][paperData.paper].paper = questionTree[subjects[i]][paperData.paper].paper.slice(0,-1);
            }
            //console.log( [subjects[i],papers[j],questionTree, topicsTree] );
            // Topics ///////////////////////////////////////////////
            for (k in paperData.questions){ // Topics
                for (l in paperData.questions[k].topics){
                    //Remove escape characters
                    if ( haveEscapeCharacters(paperData.questions[k].topics[l]) ){
                        paperData.questions[k].topics[l] = paperData.questions[k].topics[l].slice(0,-1);
                    }
                    if ( !inArray(paperData.questions[k].topics[l], topicsTree[subjects[i]]) ){
                        //console.log([i, paperData.questions[k].topics[l],subjects[i],topicsTree]);
                        topicsTree[subjects[i]].push(paperData.questions[k].topics[l]);
                    }
                    console.log([i,subjects[i],topicsTree[subjects[i]],paperData.questions[k].topics[l]],inArray(paperData.questions[k].topics[l], topicsTree[subjects[i]]));           
                }
            }/////////////////////////////////////////////////////
        }
        console.log(i);
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

router.get('/listtree', function(req, res){        
    var data = loadQuestions();
    res.json(data.questionTree);
    res.end();
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

router.get('/topics', function(req, res){          
    var data = loadQuestions();
    res.json(data.topicsTree);     
    res.end();
});

router.get('/topics/:subject', function(req, res){         
    var data = loadQuestions();
    res.json(data.topicsTree[req.params.subject]);     
    res.end();
});

router.get('/random/:subject/-/-/:quantity', function(req, res){           
    var data = loadQuestions();
    var possibleQuestions = [];
    for (i in data.questionTree[req.params.subject]){ // Papers
        for (j in data.questionTree[req.params.subject][i].questions){ // Questions
            console.log([i,j]);
            var question = data.questionTree[req.params.subject][i].questions[j];
            for (v in question.topics){
                possibleQuestions.push(question);
            }
        }
    }
    res.json(getRandom(possibleQuestions, req.params.quantity));//possibleQuestions);
    res.end();     
});


router.get('/random/:subject/:type/-/:quantity', function(req, res){           
    var data = loadQuestions();
    var possibleQuestions = [];
    for (i in data.questionTree[req.params.subject]){ // Papers
        for (j in data.questionTree[req.params.subject][i].questions){ // Questions
            console.log([i,j]);
            var question = data.questionTree[req.params.subject][i].questions[j];
            //Debugging
            if (question.type == req.params.type){
                    possibleQuestions.push(question);
            }
        }
    }
    res.json(getRandom(possibleQuestions, req.params.quantity));//possibleQuestions);
    res.end();     
});

router.get('/random/:subject/-/:topic/:quantity', function(req, res){          
    var data = loadQuestions();
    var possibleQuestions = [];
    for (i in data.questionTree[req.params.subject]){ // Papers
        for (j in data.questionTree[req.params.subject][i].questions){ // Questions
            console.log([i,j]);
            var question = data.questionTree[req.params.subject][i].questions[j];
            for (v in question.topics){
                if (question.topics[v] == req.params.topic){
                    possibleQuestions.push(question);
                }
            }
        }
    }
    res.json(getRandom(possibleQuestions, req.params.quantity));//possibleQuestions);
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

/* Work In Progress
router.post('/random', function(req, res){         
    var data = loadQuestions();
    var possibleQuestions = [];
    console.log(req.body); // Debugging
    for (i in data.questionTree[req.body.subject]){ // Papers
        for (j in data.questionTree[req.body.subject][i].questions){ // Questions
            console.log([i,j]);
            var question = data.questionTree[req.body.subject][i].questions[j];
            //Debugging
            if (question.type == req.body.type){
                for (v in question.topics){
                    if (question.topics[v] == req.body.topic){
                        possibleQuestions.push(question);
                        }
                }
            }
        }
    }
    res.json(getRandom(possibleQuestions, req.params.quantity));//possibleQuestions);
    res.end();     
});
*/

router.get('/update', function(req, res){
});

router.post('/log/quizattempt', function(req, res){
});

router.use('/questionsdata',express.static('Questions'));
//export this router to use in our index.js
module.exports = router;
