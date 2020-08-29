# ExamSnippet

An educational quiz made to provide quiz about exmination questions

Very much a Work In Progress

Just a Personal Project to test the MEAN stack

## How to use (Work in progress)
1. Prepare the exam papers and Generate an index.json for the papers
2. Put Papers in Questions/[Subject]/[Paper]
3. Set the `MONGODB_URL` environment variable to an appropriate value 
  - For Windows Powershell, use `$env:MONGODB_URL = '<URL>'`
4. Run ```npm start```
5. Open up localhost:8080

This could work too I guess: 
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## TODOs (If possible)
* Username
* Work on accounts system and logging of quiz attempts (Preferably using MongoDB)
* Reorganise the entire repository to be more professional and neater
* Make index.json Generators for Questions

## Structure
The Backend Server and REST API are coded in node.js and express
The client webpage is using AngularJS, 
* ngRoute for routing webpages
* The client webpage gets question data from the server using the REST API $http
Hopefully the Database will be coded in MongoDB
