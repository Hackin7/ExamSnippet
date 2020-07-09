### Questions #############################################################
class Question:
    def __init__(self):
        ## Question details
        self.questionId = ""
        self.question = ""
        self.given = []
        self.answers = []
        self.marks = []
        
        ## Question Type
        self.type = "open"
        self.selfMark = True
        
        ## Tagging System
        self.tags = {}
        
        ## Resources
        self.imagesURL = []
        self.answerImagesURL = []
        self.pdfsURL = []
        self.answerPdfsURL = []
    
    def getTags(self):
        self.tags["Type"] = [self.type]
        return self.tags
    
    def dictionaryFormat(self):
        question = {
            ## Question details
            "q_id": self.questionId,
            "question": self.question,
            "given": self.given,
            "correct": self.answers,
            "marks": self.marks,
            
            ## Question Type
            "type": self.type,
            "self_mark": self.selfMark,

            ## Tagging System
            "tags":self.getTags(),
            
            ## Resources
            "images": self.imagesURL,
            "answerImages": self.answerImagesURL,
            "pdf": self.pdfsURL,
            "anspdf": self.answerPdfsURL
          }
        return question
    
    def importDictionary(self, dataDict):
        ## Question details
        self.questionId = dataDict["q_id"]
        self.question = dataDict["question"]
        self.given = dataDict["given"]
        self.answers = dataDict["correct"]
        self.marks = dataDict["marks"]

        ## Question Type
        self.type = dataDict["type"]
        self.selfMark = dataDict["self_mark"]

        ## Resources
        self.imagesURL = dataDict["images"] 
        self.answerImagesURL, dataDict["answerImages"]
        self.pdfsURL = dataDict["pdf"]
        self.answerPdfsURL = dataDict["anspdf"]

class ExamQuestion(Question):
    def __init__(self):
        Question.__init__(self)
        self.subject = ""
        self.paper = ""
        self.topics = []

    def getTags(self):
        self.tags["Type"] = [self.type]
        self.tags["Subject"] = [self.subject]
        self.tags["Paper"] = [self.paper]
        self.tags["Topics"] = self.topics
        return self.tags

    def importDictionary(self, dataDict):
        Question.importDictionary(self, dataDict)
        self.subject = dataDict['tags']["Subject"][0]
        self.paper = dataDict['tags']["Paper"][0]
        self.topics = dataDict['tags']["Topics"]

import json
class QuestionStore:
    def __init__(self, filename=""):
        self.questions = []
        self.filename = filename

    def save(self, debug=False):
        questionsData = [q.dictionaryFormat() for q in self.questions]
        jsonData = json.dumps(questionsData)
        if debug:  print(questionsData,"\n\n", jsonData)
        with open(self.filename, 'w') as outfile:
            outfile.write(jsonData)

    def addQuestion(self, qns):
        self.questions.append(qns)

    def importList(self, dataList):
        for item in dataList:
            qn = ExamQuestion()
            qn.importDictionary(item)
            self.questions.append(qn)

