#Current Formats

##Question
Properties Common with all questions
1. Subject
2. Paper
3. Question ID
4. Topics
5. Images URL
6. answerImages URL
7. pdf & anspdf URL
8. question
9. type
10. given (given parts of answer)
11. Correct parts of answer
12. Marks that can be awarded for each part

Example Typical Physics Question
```
{"subject": "H2 Physics", "paper": "Physics Definitions", "q_id": "1", "topics": ["Definitions"], "images": [], "answerImages": [], "pdf": [], "anspdf": [], "question": "What is Accuracy", "type": "open", "given": [""], "correct": ["Accuracy refers to how closely the measured value agrees with the 'true' value"], "marks": [1], "self_mark": true}, 
```

Example Typical MCQ Question
```
{"subject": "H2 Physics", "paper": "2018 Innova Prelim", "q_id": "1", "topics": ["MCQ"], "images": ["https://github.com/Hackin7/ExamSnippet/blob/master/Questions/A%20Level/H2%20Physics/2018%20Innova%20Prelim%20Papers/MCQ/01.png?raw=true\r"], "answerImages": ["https://github.com/Hackin7/ExamSnippet/blob/master/Questions/A%20Level/H2%20Physics/2018%20Innova%20Prelim%20Papers/MCQ/"], "question": "", "type": "mcq", "given": ["A", "B", "C", "D"], "correct": ["A"], "marks": [1], "self_mark": false}
```

## Overall Current Structure
{Subject: Papers}
Papers = {Paper Name: Questions List}

# New Formats
## Question

New
1. Tags (A dictionary of tags)

 Irrelevant
 1. Subject
2. Paper
3. Major Categories

 Kept Constant

4. Question ID
5. Images URL
6. answerImages URL
7. pdf & anspdf URL
8. question
9. type
10. given (given parts of answer)
11. Correct parts of answer
12. Marks that can be awarded for each part

## Overall
just a list of all questions

#New Searching Algorithm
Allow Searching by Tags, not just by papers, subjects and topics

Pseudocode:
```
tags = {"Subjects":["H2 Physics"],
	     "Papers": ["Useless Paper dot Corporation", "Every Other School Revision Package"],
	     "Topics":["Elementary Mechanics", "Lolcatz Level"],
	     "Question Type":["Open Ended", "Calculation"]
	     }
	  
function inArray(item, array){
	for (int i=0; i<array.length, i++){
		if (array[i] == item){
			return true;
		}
	}
	return false;
}
meetCondition = [];
for question in AllQuestions{
	skipQuestion = false;
	givenTags = tags //As in above
	questionTags = question.tags
	for key, list in givenTags{
		//In a list, can have multiple OR conditions
		for i in list{
			if not inArray(questionTags[key],i){
				//Skip This Question
				SkipQuestion = true;
				break;
			}
			if SkipQuestion{break;}
		}
		if SkipQuestion{break;}
	}
	if not SkipQuestion{
		meetCondition.append(question);
	}
}
```

# TODOs: Top Down Design
1. User Interface
	- Search bar
	- Tags Pane
	- Questions list
		- Name, added, summary 
	- (Mobile friendly)
2. Select Questions Code
	- Find Tags
		- Tags that only appear when other tags are chosen
	 - Find Questions
	 	- Only when things are refreshed
3. Change random search to choose  by tags 
	- List of tags
	- Random select code
4. Change description on parts of the website
5. Convert data to new format