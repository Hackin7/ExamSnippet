app.controller("main", function($scope,restAPI) {
    $scope.questions = [];

    $scope.data={};
    $scope.data.url = '/QuestionData/Secondary_School_O_Level';
    $scope.data.sources=
    {"Secondary School O Level":'/QuestionData/Secondary_School_O_Level'};
    $scope.data.sourcesnames=Object.keys($scope.data.sources);
    //'/RESTAPI/listtree';
    //'https://drive.google.com/uc?id=1LzDYh6TA1JPi0jVmV9FPViUrrzWKWmEg';
    //Picking
    $scope.picking = {}
    $scope.picking.picked = {}; //Selected Questions Tree
    
    
    var inArray = function(item,array){
        for (i in array){
            if (array[i] == item){return true;}
        }
        return false;
    };
    var haveEscapeCharacters = function(string){
        escapeCharacters = ["\r","\n"]
        return inArray(string.slice(-1),escapeCharacters);
    }
    $scope.data.refresh = function(url){
        $scope.picking.subjects=[];
        $scope.picking.topics={};
        restAPI.tree(url).then(function(response) {
                $scope.picking.tree = response.data;
                //Subjects
                for (subject in $scope.picking.tree){
                    $scope.picking.subjects.push(subject);
                    //Topics
                    $scope.picking.topics[subject]=[];
                    for (paper in $scope.picking.tree[subject]){
                        var paperData = $scope.picking.tree[subject][paper];
                        for (k in paperData.questions){ // Topics
                            for (l in paperData.questions[k].topics){
                                //Remove escape characters
                                if ( haveEscapeCharacters(paperData.questions[k].topics[l]) ){
                                    paperData.questions[k].topics[l] = paperData.questions[k].topics[l].slice(0,-1);
                                }
                                if ( !inArray(paperData.questions[k].topics[l], $scope.picking.topics[subject]) ){
                                    $scope.picking.topics[subject].push(paperData.questions[k].topics[l]);
                                }
                            }
                        }
                    }
                    /////////////////
                }
        });
    };
    $scope.data.refresh($scope.data.url);
    /*
    restAPI.subjects().then(function(response) {
            $scope.picking.subjects = response.data;
    });
    */
    $scope.picking.updatePapers = function(subject){
        $scope.picking.papers=$scope.picking.tree[subject];
        $scope.picking.subject = subject; //Subject in picking
        if ($scope.picking.picked[subject] === undefined){$scope.picking.picked[subject] = {};}
        /*
        restAPI.papers(subject).then(function(response) {
            $scope.picking.papers = response.data;
            $scope.picking.subject = subject; //Subject in picking
            //console.log(subject);
            if ($scope.picking.picked[subject] === undefined){$scope.picking.picked[subject] = {};}
            //console.log($scope.picking.picked[subject]);
        });
        */
    };
    $scope.picking.updateQuestions = function(subject,paper){
        $scope.picking.questions=$scope.picking.tree[subject][paper].questions;
        $scope.picking.paper = paper; //Paper in picking
        if ($scope.picking.picked[subject][paper] === undefined){$scope.picking.picked[subject][paper] = [];}
        /*restAPI.questions(subject,paper).then(function(response) {
            $scope.picking.questions = response.data;
            $scope.picking.paper = paper; //Paper in picking
            console.log($scope.picking.picked);
            if ($scope.picking.picked[subject][paper] === undefined){$scope.picking.picked[subject][paper] = [];}
        });*/
    };
    
    $scope.picking.paperAllSelect = function(){
        var selecting = false; //Deselecting
        var checking = function(value){return value};
        for (i in $scope.picking.questions){
            if ($scope.picking.picked[$scope.picking.subject][$scope.picking.paper][i] != true){
                selecting = true; //Selecting
            }
        }
        for (i in $scope.picking.questions){
            $scope.picking.picked[$scope.picking.subject][$scope.picking.paper][i] = selecting;
        }
    };
    $scope.picking.showQuestions = function(){
        //$scope.test = [Object.keys($scope.picking.tree)];
        var subject = "";
        for (subject in $scope.picking.picked){
            //alert(subject);
            //subject = Object.keys($scope.picking.tree)[i];
            //$scope.test.push(i,subject);
            for (paper in $scope.picking.picked[subject]){
                //$scope.test.push(paper);
                for (question in $scope.picking.picked[subject][paper]){
                    //$scope.test.push($scope.picking.picked[subject][paper][question]);
                    if ($scope.picking.picked[subject][paper][question]){
                        $scope.questions.push($scope.picking.tree[subject][paper].questions[question]);
                    }
                }
            }
        }
        $scope.picking.picked = {};
    };
        
    //Random
    $scope.random = {};
    $scope.random.way = {}; // For 1 criteria
    $scope.random.type = ["mcq", "blank", "open"];
    $scope.random.criterion = [];//[{subject:"Test_Subject",type:"blank",topic:"None",quantity:2    },{subject:"Test_Subject",type:"blank",topic:"None",quantity:2  }];
    /*
    restAPI.topics().then(function(response) {
            $scope.random.topics = response.data;
    })*/
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

    randomPick = function(subject,type,topic,quantity){
        var possibleQuestions = [];
        for (i in $scope.picking.tree[subject]){ // Papers
            for (j in $scope.picking.tree[subject][i].questions){ // Questions
                var question = $scope.picking.tree[subject][i].questions[j];
                if (question.type == type || type == "-"){
                    for (v in question.topics){
                        if (question.topics[v] == topic || topic == "-"){
                            possibleQuestions.push(question);
                        }
                    }
                }
            }
        }
        return getRandom(possibleQuestions, quantity);
    };
    $scope.random.find = function(){
        for (criteria in $scope.random.criterion){
            var questions = randomPick($scope.random.criterion[criteria].subject,$scope.random.criterion[criteria].type,$scope.random.criterion[criteria].topic,$scope.random.criterion[criteria].quantity)
            for (question in questions){
                    $scope.questions.push(questions[question]);
            }
            /*
            restAPI.random($scope.random.criterion[criteria].subject,$scope.random.criterion[criteria].type,$scope.random.criterion[criteria].topic,$scope.random.criterion[criteria].quantity)
            .then(function(response) {
                var questions = response.data;
                //$scope.test.push(questions);//[$scope.random.criterion[criteria].subject,$scope.random.criterion[criteria].type,$scope.random.criterion[criteria].topic,$scope.random.criterion[criteria].quantity]);
                for (question in questions){
                    $scope.questions.push(questions[question]);
                }
            });*/
        }
    };

    //JSON data
    $scope.saveData = {};
    $scope.saveData.input = ""; //Input Save Data 
    $scope.saveData.load = function(){
        $scope.questions = JSON.parse($scope.saveData.input);
    };
    
    //Answering
    //Methods
    $scope.length = function(array){
        var foo = [];
        for (var i = 0; i < array.length; i++) {foo.push(i);}
        return foo
    }
    $scope.questionScore = function(marks){
        var total = 0;
        for (var i in marks){
            total += marks[i]
        }
        return total;
    }
    $scope.scoring = function(awarded, marks){
        var sum = 0;
        for(var i=0; i< awarded.length; i++) {
            sum += awarded[i]*Number(marks[i]);
        }
        return sum//awarded.map(x => Number(x)).reduce(function(acc, val) { return acc + val; }); 
    }
    $scope.marking = function(id){
        //for (id in $scope.questions){ //Mark all questions
            if ($scope.questions[id].self_mark == false){
                for (i in $scope.questions[id].correct){
                    if ($scope.questions[id].answer[i] == $scope.questions[id].correct[i]){
                        $scope.questions[id].awarded[i] = true;
                    }
                }
                $scope.questions[id].step = 3;
            }
        //}
    }
    $scope.checkComplete = function(questions){
        //var doneQuestions = 0;
        for (var Q in questions){
            //if(questions[Q].step == 3){doneQuestions = doneQuestions + 1;}
            if(questions[Q].step != 3){return false}
        }
        return true;//doneQuestions ==  questions.length;
    }
    $scope.totalScoring = function(questions){
        var sum = 0;
        var total = 0;
        for (var Q in questions){
            sum += $scope.scoring(questions[Q].awarded,questions[Q].marks);
            total += questions[Q].marks.reduce(function(acc, val) { return acc + val; });
        }
        return String(sum)+"/"+String(total);
    }
    $scope.mistakeHighlighting = function(question, part){
        if (question.awarded[part] == false){return {'color':'red'};}//true;}
        return {};//{'color':'blue'};//false; //question.marks[part];
    }
    // Set up question to be processed
    $scope.again = function(){
        for (var i = 0; i < $scope.questions.length; i++) {
            $scope.questions[i].id = i; // Ordering
            $scope.questions[i].step = 1; // Step
            if ($scope.questions[i].type == "mcq"){$scope.questions[i].answer = [];}
            else{$scope.questions[i].answer = $scope.questions[i].given;} //Answers by user
            $scope.questions[i].awarded = $scope.length($scope.questions[i].marks).map(x => 0); //Array($scope.questions[i].marks.length); //Marks awarded to user
            //$scope.questions[i].hasResources = true;//!($scope.questions[i].pdf[0] == None && $scope.questions[i].images[0] == None);
            //$scope.questions[i].hasAnswerResources = !($scope.questions[i].answerImages[0] == None && $scope.questions[i].anspdf[0] == None);
        }
    }
    $scope.again();
    
    $scope.questionCheckHasResources = function(Q){
            return !(Q.pdf[0] == undefined && Q.images[0] == undefined)
    }
    $scope.questionCheckHasAnswerResources = function(Q){
            return !(Q.anspdf[0] == undefined && Q.answerImages[0] == undefined);
    }
    
    $scope.answering = {
        mode : "Exam"
    };
    //document.getElementById("0_pdf").src = "https://c176.pcloud.com/dHZXyaKmVZh07JjVZZZL27TU7Z1ZZsR8ZXZ7hiy7ZvOWUjVnn0KBiqwfTb8cMm47kYIEV/2016%20Sec%204%20Express%20English%20SA2%20Dunman%20High%20School.pdf";
    //Data
    /*
    $scope.questions = [
    {
        "paper": "Test_Paper",
        "q_id": "1a", 
        "topics":["None"],
        "images":["https://imagejournal.org/wp-content/uploads/bb-plugin/cache/23466317216_b99485ba14_o-panorama.jpg",
        "https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?resize=640%2C426"],
        "answerImages":["https://imagejournal.org/wp-content/uploads/bb-plugin/cache/23466317216_b99485ba14_o-panorama.jpg",
        "https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?resize=640%2C426"],
        "question": "What is the nature of the universe?",
        "type": "blank",
        "given": ["It's shit","Hi"],
        "correct": ["It's shit", "Hi"],
        "marks": [1,2],
        "self_mark": true
    },
    {
        "paper": "noSuchPaper",
        "q_id": "1b", 
        "images":["https://imagejournal.org/wp-content/uploads/bb-plugin/cache/23466317216_b99485ba14_o-panorama.jpg",
        "https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?resize=640%2C426"],
        "answerImages":["https://imagejournal.org/wp-content/uploads/bb-plugin/cache/23466317216_b99485ba14_o-panorama.jpg",
        "https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?resize=640%2C426"],
        "question": "What is the nature of the universe?",
        "type": "blank",
        "given": ["It's shit","Hi"],
        "correct": ["It's shit", "Hi"],
        "marks": [1,2],
        "self_mark": false
    }];
    */
    /* Debugging
    restAPI.random().then(function(response) {
            $scope.test = response.data;
    });
    //$scope.questionNo = 0;
    */
});
