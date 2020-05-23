gradingSystem = {};

gradingSystem.getLength = function(array){
	var foo = [];
	for (var i = 0; i < array.length; i++) {foo.push(i);}
	return foo;
}

// Scoring System //////////////////////////////////////////////////////////////////
// Auxilary Functions
gradingSystem.questionScore = function(marks){
	var total = 0;
	for (var i in marks){total += marks[i]}
	return total;
}
gradingSystem.scoring = function(awarded, marks){
	var sum = 0;
	for(var i=0; i< awarded.length; i++) {
		sum += awarded[i]*Number(marks[i]);
	}
	return sum;
}

gradingSystem.marking = function(Q){
	Q.step = Q.step + 1;
	if (Q.self_mark == false){
		for (i in Q.correct){
			if (Q.answer[i] == Q.correct[i]){
				Q.awarded[i] = true;
			}
		}
		Q.step = 3;
	}
}

gradingSystem.getTotalScoring = function(questions){
	var sum = 0;
	var total = 0;
	for (var Q in questions){
		sum += gradingSystem.scoring(questions[Q].awarded,questions[Q].marks);
		total += questions[Q].marks.reduce(function(acc, val) { return acc + val; });
	}
	return String(sum)+"/"+String(total);
}

// Set up question to be processed ///////////////////////////////////////////////////////////////////
gradingSystem.process = function(questions){
	for (var i = 0; i < questions.length; i++) {
		questions[i].id = i; // Ordering
		questions[i].step = 1; // Step
		if (questions[i].type == "mcq"){questions[i].answer = [];}
		else{questions[i].answer = questions[i].given;} //Answers by user
		questions[i].awarded = gradingSystem.getLength(questions[i].marks).map(x => 0); //Marks awarded to user
		questions[i].whiteboard = [];
	}
}
//gradingSystem.again();

// Presentation of Questions ///////////////////////////////////////////////////////////////////////////
// Check if all questions are marked
gradingSystem.checkMarkedComplete = function(questions){
	for (var Q in questions){
		if(questions[Q].step < 3){return false}
	}
	return true;
}
gradingSystem.checkQuestionHasResources = function(Q){
	let pdf  = Q.pdf != null && Q.pdf.length >= 1;
	let images  = Q.images != null && Q.images.length >= 1;
	var condition =  pdf || images;
	return condition;
}
gradingSystem.checkQuestionHasAnswerResources = function(Q){
	let pdf  = Q.anspdf != null && Q.anspdf.length >= 1;
	let images  = Q.answerImages != null && Q.answerImages.length >= 1;
	var condition =  pdf || images;
	return condition;
}
gradingSystem.mistakeHighlighting = function(Q, part){
	if (Q.awarded[part] == false){return {'color':'red'};}//true;}
	return {};
}
