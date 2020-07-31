import QuestionStructure as qs
import pandas as pd

def read(field):
    string = str(field)
    if string == "nan" or string == '-':
        return ""
    else:
        return str(field)
    
def readList(string):
    string = str(string)
    if string == 'nan' or string == '-':
        return []
    else:
        return string.split('|')
    
def readToQuestionStore(qStore, FILENAME):
    xlsx = pd.ExcelFile(FILENAME)
    df = pd.read_excel(xlsx,  'Questions')
    
    print(df.shape[0])
    for rowIndex in range(df.shape[0]): # Number of rows
        row = df.iloc[rowIndex]
        ### Assignment of Question Data ########################
        if str(row["Subject"]) == "nan": #Nothing left
            break
        
        question = qs.ExamQuestion()
        question.subject = read(row["Subject"])
        question.paper = read(row["Paper"])
        question.topics = readList(row["Topics"])

        question.questionId = read(row["QuestionID"])
        question.question = read(row["Question"])
        question.given = readList(row["Given"])
        if len(question.given) == 0:
            question.given.append("")
        question.answers = readList(row["Answers"])
        question.marks = [int(float(m)) for m in readList(row["Marks"])]

        question.type = read(row["Type"])
        question.selfMark = read(row["selfMark"])!="0"
        #print(question.selfMark!="0")

        question.imagesURL = readList(row["imagesURL"])
        question.answerImagesURL = readList(row["answerImagesURL"])
        question.pdfsURL = readList(row["pdfsURL"])
        question.answerPdfsURL = readList(row["answerPdfsURL"])
        ###############################################################
        qStore.addQuestion(question)
    
XLS_FILENAME = './output.xlsx'
JSON_FILENAME = '../../public/QuestionData/A_Level.json'

store = qs.QuestionStore(JSON_FILENAME)
readToQuestionStore(store, XLS_FILENAME)
store.save()#True)
