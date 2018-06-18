app.controller("main", function($scope,restAPI) {
	$scope.questions = [];

	//Picking
	$scope.picking = {}
	$scope.picking.picked = {}; //Selected Questions Tree
	restAPI.subjects().then(function(response) {
			$scope.picking.subjects = response.data;
	});
	restAPI.tree().then(function(response) {
			$scope.picking.tree = response.data;
	});
	$scope.picking.updatePapers = function(subject){restAPI.papers(subject).then(function(response) {
			$scope.picking.papers = response.data;
			$scope.picking.subject = subject; //Subject in picking
			if ($scope.picking.picked[subject] === null){$scope.picking.picked[subject] = {};}
	});};
	$scope.picking.updateQuestions = function(subject,paper){restAPI.questions(subject,paper).then(function(response) {
			$scope.picking.questions = response.data;
			$scope.picking.paper = paper; //Paper in picking
			if ($scope.picking.picked[subject][paper] === null){$scope.picking.picked[subject][paper] = [];}
	});};
	$scope.picking.paperAllSelect = function(){
		var selecting = false; //Deselecting
		var checking = function(value){return value};
		for (i in $scope.picking.questions){
			if ($scope.picking.picked[$scope.picking.subject][$scope.picking.paper][i] !== true){
				selecting = true; //Selecting
			}
		}
		for (i in $scope.picking.questions){
			$scope.picking.picked[$scope.picking.subject][$scope.picking.paper][i] = selecting;
		}
	};
	$scope.picking.showQuestions = function(){
		for (subject in $scope.picking.tree){
			for (paper in $scope.picking.tree[subject]){
				for (question in $scope.picking.tree[subject][paper].questions){
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
	$scope.random.type = ["mcq", "blank", "open"];
	$scope.random.criterion = [];//[{subject:"Test_Subject",type:"blank",topic:"None",quantity:2	},{subject:"Test_Subject",type:"blank",topic:"None",quantity:2	}];
	restAPI.topics().then(function(response) {
			$scope.random.topics = response.data;
	})
	$scope.random.find = function(){
		for (criteria in $scope.random.criterion){
			restAPI.random($scope.random.criterion[criteria].subject,$scope.random.criterion[criteria].type,$scope.random.criterion[criteria].topic,$scope.random.criterion[criteria].quantity)
			.then(function(response) {
				var questions = response.data;
				//$scope.test.push(questions);//[$scope.random.criterion[criteria].subject,$scope.random.criterion[criteria].type,$scope.random.criterion[criteria].topic,$scope.random.criterion[criteria].quantity]);
				for (question in questions){
					$scope.questions.push(questions[question]);
				}
			});
		}
	};

	//Answering
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
	
	restAPI.random().then(function(response) {
			$scope.test = response.data;
	});
    $scope.questionNo = 0;
	$scope.again();
		
	$scope.answering = {
		mode : "Exam"
	};
	
});
