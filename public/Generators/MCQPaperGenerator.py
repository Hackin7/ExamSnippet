print("Exam Snippet index.json generator")
print("Only input MCQ answers")
print("Advised to just input data by stdin")
#input = raw_input#For Running on Python 2
index = {
    "subject": input("Name of Subject: "),
    "paper": input("Name of Paper: "),
    "questions": []
}

topics = input("Topics: ").split(',')
MainURL = input("Main URL for images (eg. /RESTAPI/questiondata/Chemistry/1000_MCQ/: ")
answerimage = input("Enter answer image name (eg ans.jpg): ")

images = []
n = int(input("Number of images: "))
for i in range(n):
	images.append(MainURL+input("Enter image "+str(n)+":"))
	
n = int(input("Number of questions: "))
for i in range(n):
  print("For Question ", i + 1)
  #Sample Question
  question = {
    "subject": index["subject"],
    "paper": index["paper"],
    "q_id": "",
    "topics": topics, #[]
    "images": [],
    "answerImages": [],
    "question": "",
    "type": "mcq",
    "given": ["A", "B", "C", "D"],
    "correct": [],
    "marks": [1],
    "self_mark": False
  }
  question["q_id"] = str(i + 1)
  question["answerImages"] = [MainURL+answerimage]
  #question["topics"] = topics
  question["correct"] = [input("Correct answer (A,B,C,D): ")]
  index["questions"].append(question)
  #print(question)

array = []
for i in range(n):
	index["questions"][i]["images"] = input("Enter image name of Question "+ str(i+1)+" (eg 1.jpg): ").split()
	for j in range(len(index["questions"][i]["images"])):
		index["questions"][i]["images"][j] = images[ int(index["questions"][i]["images"][j])-1 ]# MainURL + index["questions"][i]["images"][j]
	#print(index["questions"][i]["images"][j])
	#array.append(i)
	#print(question["images"])
print(array)

import json
r = json.dumps(index)

with open('index.json', 'w') as outfile:
	print(json.dumps(index))
	outfile.write(json.dumps(index))
