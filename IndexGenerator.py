print("Exam Snippet index.json generator")
print("Advised to just input data by stdin")
#input = raw_input#For Running on Python 2
index = {
"paper":input("Name of Paper: "),
"questions":[]
}

def answering(qtype, given=[],correct=[],marks=[]):
   n = int(input("Number of answering areas: "))
   #given, correct, marks = [], [], []
   for i in range(n):
       given.append(input("Given value for area "+str(i+1)+" : "))
       if qtype != "mcq":
           correct.append(input("Correct answer for area "+str(i+1)+" : "))
           marks.append(input("Marks given for area "+str(i+1)+" : "))
   if qtype == "mcq":
       correct.append(input("Correct answer: "))
       marks.append(input("Marks given: "))
   return given, correct, marks

for i in range(int(input("Number of questions: "))):
   question = {}
   question["q_id"] = input("Question Id(Number): ")
   question["quesion"] = str(input("Question: "))
   question["type"] = input("Type (mcq,blank,open): ")
   question["given"], question["correct"], question["marks"] = answering(question["type"])
   question["self_mark"] = input("Self Marking by User: ")
   index["questions"].append(index)
   
print(index)
import json
with open('index.json', 'w') as outfile: 
    json.dump(index, outfile)