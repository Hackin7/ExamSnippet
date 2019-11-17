#Typical Exam Paper Generator

# Remove Escape Characters
def filtering(text):
    if len(text) <= 0: return text
    if text[-1] in ["\r","\n"]: return text[0:-1] 
    return text


print("Exam Snippet index.json generator for typical exam papers")
print("Advised to just input data by stdin")
input("Press Enter to continue:")

index = {
    "subject": filtering(input("Name of Subject: ")),
    "paper": filtering(input("Name of Paper: ")),
    "pdf":[],
    "questions": []
}
'''
PDFs = []
n = int(input("Number of PDFs: "))
for i in range(n):
    PDFs.append(filtering(input("URL of PDF {} to check: ".format(i+1))))
    
index["pdf"] = PDFs

ansPDFs = []
n = int(input("Number of answer PDFs: "))
for i in range(n):
    ansPDFs.append(filtering(input("URL of Answer PDF {} to check: ".format(i+1))))


images = []
n = int(input("Number of images: "))
for i in range(n):
    images.append(filtering(input("Enter image {}:".format(i+1))))

answerimages = []
n = int(input("Number of answer images: "))
for i in range(n):
    answerimages.append(filtering(input("Enter answer image {}:".format(i+1))))
'''
#Question ID
i=0
while input() != "0":
  print("For Question ", i + 1)
  #Sample Question
  question = {
    "subject": index["subject"],
    "paper": index["paper"],
    "q_id": "",
    "topics": [], #[]
    "images": [],
    "answerImages": [],
    "pdf": [],#PDFs,
    "anspdf": [],#ansPDFs,
    "question": "",
    "type": "open",
    "given": [""],
    "correct": [],
    "marks": [],
    "self_mark": True
  }
  question["q_id"] = str(i+1)
  marksgiven, *question["topics"] = input("Number of marks given, Topics: ".format(i+1)).split(",")
  marksgiven = filtering(marksgiven)
  for topic in range(len(question["topics"])):
      question["topics"][topic] = filtering(question["topics"][topic])
  #Marks Given
  question["correct"] = ["" for j in range(int(marksgiven))]
  question["marks"] = [1 for j in range(int(marksgiven))]
  
  question["question"] = input("Question " + str(i+1)+": ")
  question["correct"][0] = input("Question " + str(i+1)+": ")
  index["questions"].append(question)
  i+=1


    
import json
r = json.dumps(index)

with open('index.json', 'w') as outfile:
    print(json.dumps(index))
    outfile.write(json.dumps(index))
input()
