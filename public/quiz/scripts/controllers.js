app.controller("main", function($scope,restAPI) {
    $scope.questions = [];
    //Dummy Data
    $scope.allQuestions = [
        {"question":"What is life?","tags":{"Topic":["hi"],"Subject":["hello singapore"]} },
        {"question":"What is up?","tags":{"Topic":["hi","not hi"]} },
        {"question":"What is down?","tags":{"Topic":["You are a failure"]} }
    ];
    $scope.data={};
    $scope.data.url = '/QuestionData/A_Level';//'/QuestionData/Secondary_School_O_Level';
    $scope.data.sources=
    {"Secondary School O Level":'/QuestionData/Secondary_School_O_Level',
        "A Level":'/QuestionData/A_Level'};
    $scope.data.sourcesnames=Object.keys($scope.data.sources);
    //'/RESTAPI/listtree';
    //'https://drive.google.com/uc?id=1LzDYh6TA1JPi0jVmV9FPViUrrzWKWmEg';
    
    ////Helpful Methods/////////////////////////////////////////////////
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
    var removeEscapeCharacters = function(string){
        if (haveEscapeCharacters(string)){
            return string.slice(0,-1);
        }
        return string;
    }
    var legacyToNew = function(Qn){
        try{
        if (Qn.tags == null){
            if (Qn.q_id != null)Qn.q_id = Qn.paper+" "+Qn.q_id;
            Qn.tags={
                "Type":[removeEscapeCharacters(Qn.type)],
                "Subject":[removeEscapeCharacters(Qn.subject)], 
                "Paper":[removeEscapeCharacters(Qn.paper)],
                "Topics":[]
            };
            if (Qn.topics != null){
                Qn.tags.Topics = Qn.topics.map(removeEscapeCharacters);
            }
        }}
        catch{}
        return Qn;
    }
    $scope.findKeys = function(object){
        return Object.keys(object);
    }
    ////Getting Data/////////////////////////////////////////////////////
    $scope.picking = {}
    $scope.picking.picked = {}; //Selected Questions Tree
    $scope.search = {};
    $scope.data.refresh = function(url){
        $scope.allQuestions=[];$scope.search.selected = {};
        restAPI.tree(url).then(function(response) {
                $scope.picking.tree = response.data;
                for (subject in $scope.picking.tree){
                    for (paper in $scope.picking.tree[subject]){
                        var paperData = $scope.picking.tree[subject][paper];
                        for (k in paperData.questions){ // Topics
                            //Legacy support
                            Qn = legacyToNew(paperData.questions[k]);
                            $scope.allQuestions.push(Qn);
                        }
                    }
                    /////////////////
                }
        });
    };
    $scope.data.refresh($scope.data.url);
     
    ////Searching////////////////////////////////////////////////////////
    
    $scope.search = {};
    $scope.search.query="";
    $scope.search.found = {};// Index of found questions
    $scope.search.selected = {};
    $scope.search.tags = {}; //Selected Questions Tree
    $scope.search.tagSelect = {}; //Selected Questions Tree
    
    $scope.search.updateTags = function(){
        allTags = {};
        $scope.search.searchQuestions();
        questionIndex = $scope.search.found;
        //alert($scope.search.found);
        
        questionList = $scope.allQuestions;
        
        //for (q in questionList){
        for (i in questionIndex){
            q = questionIndex[i];
            SkipQuestion = false;
            questionTags = questionList[q].tags;
            for (cat in questionTags){
                if (allTags[cat] == undefined){
                    allTags[cat] = [];
                }
                for (tag in questionTags[cat]){
                    if (!inArray(questionTags[cat][tag],allTags[cat]) ){
                        allTags[cat].push(questionTags[cat][tag])
                    } 
                }
            }
        }
        $scope.search.tags = allTags;
    }
    $scope.search.searchQuestions = function(){
        query = $scope.search.query;
        givenTags = $scope.search.tagSelect;
        meetCondition = [];
        for (q in $scope.allQuestions){
            if (!$scope.allQuestions[q].question.includes(query)){
                continue;
            }
            SkipQuestion = false;
            questionTags = $scope.allQuestions[q].tags;
            //Categories
            for (cat in givenTags){
                //All tags
                for (tag in givenTags[cat]){
                    if (givenTags[cat][tag] && !inArray(tag,questionTags[cat]) ){
                        //Skip This Question
                        SkipQuestion = true;
                        break;
                    }
                }
                if (SkipQuestion){break;}
            }
            if (!SkipQuestion){
                meetCondition.push(q);//AllQuestions[q]);
            }
        }
        $scope.search.found =  meetCondition;
    }
    $scope.search.addQuestions = function(){
        for (i in $scope.search.selected){
            if ($scope.search.selected[i]){
                $scope.questions.push($scope.allQuestions[i]);}
        }
    }
    $scope.search.selectAll = function(){
        var selecting = false; //Deselecting
        var checking = function(value){return value};
        for (i in $scope.search.found){
            if ($scope.search.selected[$scope.search.found[i]] != true){
                selecting = true; //Selecting
            }
        }
        for (i in $scope.search.found){
            $scope.search.selected[$scope.search.found[i]] = selecting;
        }
    };
    
       
    //Random
    $scope.random = {};
    $scope.random.way = {}; // For 1 criteria
    $scope.random.type = ["mcq", "blank", "open"];
    $scope.random.criterion = [];
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
    $scope.random.find = function(){
        n = $scope.random.way.quantity;
        $scope.search.searchQuestions();

        //Deselect all
        for (i in $scope.search.selected){
            $scope.search.selected[i] = false;
        } 
        //Random Selection
        len = $scope.search.found.length;
        if (n>=len)$scope.search.selectAll();
        //No questions
        for (var i=0;i<n;i++){
            var x = $scope.search.found[Math.floor(Math.random() * len)];
            while ($scope.search.selected[x]){var x = Math.floor(Math.random() * len);}
            $scope.search.selected[x]=true;
        }
        
        
    };

    //JSON data
    $scope.saveData = {};
    $scope.saveData.input = ""; //Input Save Data 
    $scope.saveData.load = function(){
        $scope.questions = JSON.parse($scope.saveData.input);
        for (i in $scope.questions){
            $scope.questions[i] = legacyToNew($scope.questions[i]);
        }
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
});

