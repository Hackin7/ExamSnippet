print("Exam Snippet index.json generator")
print("Generally for  Humanities(Social Studies) Papers")
print("Advised to just input data by stdin")
#input = raw_input#For Running on Python 2
index = {
    "subject": input("Name of Subject: "),
    "paper": input("Name of Paper: "),
    "questions": []
}

#topics = input("Topics: ").split(',')
MainURL = input("Main URL for images (eg. /RESTAPI/questiondata/Chemistry/1000_MCQ/: ")
#answerimage = input("Enter answer image name (eg ans.jpg): ")

images = []
n = int(input("Number of images: "))
for i in range(n):
	images.append(MainURL+input("Enter image "+str(n)+":"))

answerimages = []
n = int(input("Number of answer images: "))
for i in range(n):
	answerimages.append(MainURL+input("Enter answer image "+str(n)+":"))
	
n = int(input("Number of questions: "))
#Question ID
for i in range(n):
  print("For Question ", i + 1)
  #Sample Question
  question = {
    "subject": index["subject"],
    "paper": index["paper"],
    "q_id": "",
    "topics": [], #[]
    "images": [],
    "answerImages": [],
    "question": "",
    "type": "open",
    "given": [""],
    "correct": [],
    "marks": [],
    "self_mark": True
  }
  question["q_id"] = input("Question Number/ID:")
  question["answerImages"] = answerimages
  index["questions"].append(question)

#Topics
for i in range(n):
	index["questions"][i]["topics"] = input("Topic(s): ").split(',')

#Marks Given
for i in range(n):
	marksgiven = int(input("Number of marks given for Question "+ str(i+1)+": "))
	index["questions"][i]["correct"] = ["" for j in range(marksgiven)]
	index["questions"][i]["marks"] = [1 for j in range(marksgiven)]

#Images
for i in range(n):
	index["questions"][i]["images"] = input("Enter image number of Question "+ str(i+1)+" (from 1): ").split()
	for j in range(len(index["questions"][i]["images"])):
		index["questions"][i]["images"][j] = images[ int(index["questions"][i]["images"][j])-1 ]# MainURL + index["questions"][i]["images"][j]

#Answer Images
for i in range(n):
	index["questions"][i]["answerImages"] = input("Enter answer image number of Question "+ str(i+1)+" (from 1): ").split()
	for j in range(len(index["questions"][i]["answerImages"])):
		index["questions"][i]["answerImages"][j] = answerimages[ int(index["questions"][i]["answerImages"][j])-1 ]# MainURL + index["questions"][i]["images"][j]

#Questions
for i in range(n):
	index["questions"][i]["question"] = input("Question " + str(i+1)+": ")

import json
r = json.dumps(index)

with open('index.json', 'w') as outfile:
	print(json.dumps(index))
	outfile.write(json.dumps(index))
