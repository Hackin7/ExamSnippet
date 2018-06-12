var app = angular.module("quiz", []);

app.directive("question", function() {
    return {
        //restrict : "E",
        //template : '<div class="card" style="width: 60%; margin:auto;"><form method="POST" action="/quiz/marking/" ><div class="card-header">Question {{Q.question_no}}</div><div class="card-body">	<img src="{{image_path}}" alt="No related image of question here"width="100%"/>	<p>Q{{Q.q_id}}: {{Q.question}}</p>{{{Q.input}}}<br></div><div class="card-footer"><input type="submit" class="btn btn-default" style="float:left;" value="Quit"/><input type="submit" class="btn btn-default" style="float:right;" value="Submit"/><input type="reset" class="btn btn-default" style="float:right;" value="Reset"/></div></form></div>'
		templateUrl: "/question.html"
    };
});

app.controller("answering", ['$scope', function($scope) {
	//Methods
	$scope.length = function(array){
		var foo = [];
		for (var i = 0; i < array.length; i++) {foo.push(i);}
		return foo
	}
	$scope.scoring = function(awarded, marks){
		var sum = 0;
		for(var i=0; i< awarded.length; i++) {
			sum += awarded[i]*marks[i];
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
	$scope.again = function(){
		for (var i = 0; i < $scope.questions.length; i++) {
			$scope.questions[i].id = i; // Ordering
			$scope.questions[i].step = 1; // Step
			if ($scope.questions[i].type == "mcq"){$scope.questions[i].answer = [];}
			else{$scope.questions[i].answer = $scope.questions[i].given;} //Answers by user
			$scope.questions[i].awarded = $scope.length($scope.questions[i].marks).map(x => 0); //Array($scope.questions[i].marks.length); //Marks awarded to user
		}
	}
	//Modes and Settings
	$scope.mode = "Exam";
	//Data
    var question = {
		"paper": "noSuchPaper",
		"q_id": "1a", 
		"images":["https://imagejournal.org/wp-content/uploads/bb-plugin/cache/23466317216_b99485ba14_o-panorama.jpg",
		"https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?resize=640%2C426"],
		"question": "What is the nature of the universe?",
		"type": "blank",
		"given": ["It's shit","Hi"],
		"correct": ["It's shit", "Hi"],
		"marks": [1,2],
		"self_mark": true
	};
    $scope.questions = [question,{
		"paper": "noSuchPaper",
		"q_id": "1b", 
		"images":["https://imagejournal.org/wp-content/uploads/bb-plugin/cache/23466317216_b99485ba14_o-panorama.jpg",
		"https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?resize=640%2C426"],
		"question": "What is the nature of the universe?",
		"type": "blank",
		"given": ["It's shit","Hi"],
		"correct": ["It's shit", "Hi"],
		"marks": [1,2],
		"self_mark": false
	}];
    $scope.questionNo = 0;
	$scope.again();
}]);

app.controller("methods", function($scope){
});