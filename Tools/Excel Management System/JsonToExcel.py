import QuestionStructure as qs
import pandas as pd

def getDfCol(df):
    ## Print Columns
    col = []
    for i in df:
        col.append(i)
    return col

#FILENAME = './Sample.xlsx'
#printDfCol(pd.read_excel(pd.ExcelFile(FILENAME),  'Questions'))
#exit()

def listToString(dataList):
    dataList = [str(i) for i in dataList]
    return ','.join(dataList)
    
def questionStoreToDataframe(qStore):
    columns = ['Subject', 'Paper', 'Topics', 'QuestionID', 'Question', 'Given', 'Answers', 'Marks', 'Type', 'selfMark', 'imagesURL', 'answerImagesURL', 'pdfsURL', 'answerPdfsURL']

    dataDict = {}
    for col in columns:
        dataDict[col] = []

    for question in qStore.questions:
        dataDict["Subject"].append(question.subject)
        dataDict["Paper"].append(question.paper)
        dataDict["Topics"].append(listToString(question.topics))

        dataDict["QuestionID"].append(question.questionId)
        dataDict["Question"].append(question.question)
        dataDict["Given"].append(listToString(question.given))
        dataDict["Answers"].append(listToString(question.answers))
        dataDict["Marks"].append(listToString(question.marks))
        
        dataDict["Type"].append(question.type)
        dataDict["selfMark"].append(question.selfMark)
        
        dataDict["imagesURL"].append(listToString(question.imagesURL))
        dataDict["answerImagesURL"].append(listToString(question.answerImagesURL))
        dataDict["pdfsURL"].append(listToString(question.pdfsURL))
        dataDict["answerPdfsURL"].append(listToString(question.answerPdfsURL))

    df = pd.DataFrame(dataDict)#,index=list(range(1,len(dataDict['Subject'])+1)) )
    return df


JSON_FILENAME = '../../public/QuestionData/A_Level.flattened.json'
XLS_FILENAME = './output.xlsx'

import json
with open(JSON_FILENAME) as f:
  jsonData = json.load(f)

qStore = qs.QuestionStore()
qStore.importList(jsonData)

df = questionStoreToDataframe(qStore)
df.to_excel(XLS_FILENAME,sheet_name='Questions')
