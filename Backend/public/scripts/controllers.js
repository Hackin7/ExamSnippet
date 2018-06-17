app.controller("answering", function($scope,restAPI,$routeParams) {
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
	restAPI.random().then(function(response) {
			$scope.test = response.data;
	});
    $scope.questionNo = 0;
	$scope.again();
	
	$scope.subjects = ["Chemistry", "Physics"]
	$scope.picking = {}
	restAPI.subjects().then(function(response) {
			$scope.picking.subjects = response.data;
	});
	$scope.updatePapers = function(subject){restAPI.papers(subject).then(function(response) {
			$scope.picking.subject = subject;
			$scope.picking.papers = response.data;
	});};
	$scope.updateQuestions = function(subject,paper){restAPI.questions(subject,paper).then(function(response) {
			$scope.picking.paper = paper;
			$scope.picking.questions = response.data;
	});};
	
	$scope.type = ["MCQ", "Blanks", "Open-ended"];
	$scope.topics = ["Magnetism", "Organic Chemistry", "Metals"];
	$scope.random = {};
	$scope.random.types = [];//[{subject:"Test_Subject",type:"blank",topic:"None",quantity:2	},{subject:"Test_Subject",type:"blank",topic:"None",quantity:2	}];

});

app.controller("finding", function($scope) {
	$scope.length = function(array){
		var foo = [];
		for (var i = 0; i < array.length; i++) {foo.push(i);}
		return foo
	}
	$scope.subjects = ["Chemistry", "Physics"]
	$scope.type = ["MCQ", "Blanks", "Open-ended"]
	$scope.topics = ["Magnetism", "Organic Chemistry", "Metals"]
	$scope.randomTypes = [{subject:"Test_Subject",type:"blank",topic:"None",quantity:2	},{subject:"Test_Subject",type:"blank",topic:"None",quantity:2	}]
});

app.controller("main", function($scope) {
	$scope.length = function(array){
		var foo = [];
		for (var i = 0; i < array.length; i++) {foo.push(i);}
		return foo
	}
});