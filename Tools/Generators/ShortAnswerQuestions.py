#Typical Exam Paper Generator

# Remove Escape Characters
def filtering(text):
    if len(text) <= 0: return text
    if text[-1] in ["\r","\n"]: return text[0:-1] 
    return text


print("Exam Snippet index.json generator for short Answer Questions")
print("Advised to just input data by stdin")
input("Press Enter to continue:")

index = {
    "subject": filtering(input("Name of Subject: ")),
    "paper": filtering(input("Name of Paper: ")),
    "pdf":[],
    "questions": []
}

topic = filtering(input("Topic:"))
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
n = int(input("Number of questions: "))
#Question ID
for i in range(n):
'''

input()
#Questions
i = 0    
while True:
  print("For Question ", i + 1)
  #Sample Question
  question = {
    "subject": index["subject"],
    "paper": index["paper"],
    "q_id": str(i+1),
    "topics": [topic], #[]
    "images": [],
    "answerImages": [],
    "pdf": [],
    "anspdf": [],
    "question": "",
    "type": "open",
    "given": [""],
    "correct": [],
    "marks": [],
    "self_mark": True
  }
  marksgiven = int(input("Marks")) 
  if marksgiven == 0: break
  #Marks Given
  question["marks"] = [1 for j in range(int(marksgiven))]
  question["question"] = input("Question " + str(i+1)+": ")
  for partans in range(marksgiven):
      question["correct"] += [input("Ans:")]

  index["questions"].append(question)
  i+=1
'''
#Images
for i in range(len(images)):
    questionIDs = input("Enter Questions for Image {}: ".format(i+1)).split(',')
    for j in range(len(index["questions"])):
        # Remove Escape Characters
        index["questions"][j]["q_id"] = filtering(index["questions"][j]["q_id"])
        for k in questionIDs:
            qid = k
            # Remove Escape Characters
            qid = filtering(qid)
            if qid == index["questions"][j]["q_id"]:
                index["questions"][j]["images"].append(images[i])
                
#Answer Images
for i in range(len(answerimages)):
    questionIDs = input("Enter Questions for Answer Image {}: ".format(i+1)).split(',')
    for j in range(len(index["questions"])):
        index["questions"][j]["q_id"] = filtering(index["questions"][j]["q_id"])
        for k in questionIDs:
            qid = k
            # Remove Escape Characters
            qid = filtering(qid)
            if qid == index["questions"][j]["q_id"]:
                index["questions"][j]["answerImages"].append(answerimages[i])
'''
    


    
import json
r = json.dumps(index)

with open('index.json', 'w') as outfile:
    print(json.dumps(index))
    outfile.write(json.dumps(index))
