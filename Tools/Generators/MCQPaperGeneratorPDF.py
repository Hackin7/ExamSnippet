print("Exam Snippet index.json generator for typical MCQ exam papers")
print("Only input MCQ answers") 
print("Advised to just input data by stdin")
input("Press Enter to continue:")

index = {
    "subject": input("Name of Subject: "),
    "paper": input("Name of Paper: "),
    "pdf":[],
    "questions": []
}

PDFs = []
n = int(input("Number of PDFs: "))
for i in range(n):
	PDFs.append(input("URL of PDF {} to check: ".format(i+1)))
	
index["pdf"] = PDFs

ansPDFs = []
n = int(input("Number of answer PDFs: "))
for i in range(n):
	ansPDFs.append(input("URL of Answer PDF {} to check: ".format(i+1)))

#topics = input("Topics: ").split(',')
#MainURL = input("Main URL for images (eg. /RESTAPI/questiondata/Chemistry/1000_MCQ/: ")
#answerimage = input("Enter answer image name (eg ans.jpg): ")

n = int(input("Number of questions: "))
for i in range(n):
  print("For Question ", i + 1)
  #Sample Question
  question = {
    "subject": index["subject"],
    "paper": index["paper"],
    "q_id": "",
    "topics": [],
    "images": [],
    "answerImages": [],
    "pdf": PDFs,
    "anspdf": ansPDFs,
    "question": "",
    "type": "mcq",
    "given": ["A", "B", "C", "D"],
    "correct": [],
    "marks": [1],
    "self_mark": False
  }
  question["q_id"] = str(i + 1)
  #question["answerImages"] = [MainURL+answerimage]
  #question["topics"] = topics
  question["correct"] = [input("Correct answer (A,B,C,D): ")]
  index["questions"].append(question)
  #print(question)

'''
array = []
for i in range(n):
	index["questions"][i]["images"] = input("Enter image number of Question "+ str(i+1)+" (eg 1): ").split()
	for j in range(len(index["questions"][i]["images"])):
		index["questions"][i]["images"][j] = images[ int(index["questions"][i]["images"][j])-1 ]# MainURL + index["questions"][i]["images"][j]
	#print(index["questions"][i]["images"][j])
	#array.append(i)
	#print(question["images"])
print(array)
'''
import json
r = json.dumps(index)

with open('index.json', 'w') as outfile:
	print(json.dumps(index))
	outfile.write(json.dumps(index))
