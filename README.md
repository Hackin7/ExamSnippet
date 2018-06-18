# ExamSnippet

An educational quiz made to provide quiz about exmination questions

Very much a Work In Progress

Just a Personal Project to test the MEAN stack

## How to use
1. Prepare the exam papers and Generate an index.json for the papers
2. Put Papers in Questions/[Subject]/[Paper]
3. Run ```cd Backend && node index.json```
4. Open up localhost:3000/index.html

## TODOs (If possible)
* JSON Save File Mode
* Username
* Work on accounts system and logging of quiz attempts (Preferably using MongoDB)
* Reorganise the entire repository to be more professional and neater

## Structure
The Backend Server and REST API are coded in node.js and express
The client webpage is using AngularJS, 
* ngRoute for routing webpages
* The client webpage gets question data from the server using the REST API $http
Hopefully the Database will be coded in MongoDB
