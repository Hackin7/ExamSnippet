import json

def legacyToNew(Qn):
    if Qn.get("tags") == None:
        if (Qn.get("q_id") != None):
            Qn['q_id'] = Qn['paper'] + ' ' + Qn['q_id']
        Qn['tags'] = {
            'Type':[Qn['type'].strip()],
            'Subject':[Qn['subject'].strip()],
            'Paper':[Qn['paper'].strip()],
            'Topics':[] if Qn.get('topics')==None else [i.strip() for i in Qn['topics']]
        }
    keys = ['images', 'answerImages', 'pdf', 'anspdf']
    for i in keys:
        if Qn.get(i) == None: Qn[i] = []
        
    return Qn

FILENAME = "../public/QuestionData/A_Level"
NEW_FILENAME = "../public/QuestionData/A_Level.flattened.json"

with open(FILENAME,'r', encoding="utf8") as f:
    #print(f.read())
    data = json.load(f)

questionsList = []
for subject, papers in data.items():
    for paper, questions in papers.items():
        #print(paper,questions)
        for question in questions['questions']:
            questionsList.append(legacyToNew(question))

print(questionsList[0])#:10])
with open(NEW_FILENAME, 'w') as outfile:
    outfile.write(json.dumps(questionsList))
