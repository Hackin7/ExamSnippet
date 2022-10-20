# ExamSnippet

An educational quiz made to provide (random) examination questions.
It's meant to help students to self practice whenever and wherever they want to.
You can self-mark papers or for MCQ questions, get the computer to mark for you!

Just a Personal Project to test the MEAN/MEVN stack

Since I have finished Secondary School and Junior College I probably won't be updating this website any longer with new features or questions. Feel free to make any pull requests or anything or copy the idea!

## How to use 
1. Prepare the exam papers and Generate an index.json for the papers
 - You can put the questions and papers in an Excel Sheet, and then use `ExcelToJson.py`. Check `Tools/Excel Management System`
2. Put Papers in Questions/[Subject]/[Paper]
3. Set the `MONGODB_URL` environment variable to an appropriate value 
  - For Windows Powershell, use `$env:MONGODB_URL = '<URL>'`
4. Run ```npm start```
5. Open up localhost:8080

This could work too I guess: 
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Or just deploy on render too, since heroku is shutting down. Just link the git repo and it should work

## Structure
The Backend Server and REST API are coded in node.js and express
The client webpage is using VueJS, 
The database will be coded in MongoDB

## Dependency Warning

This application is using relatively dated libraries, which means that it would need a rewrite if to be pursued further. Right now, it should be able to be used in its current state.

Examples

1. https://github.com/winstonjs/winston-mongodb/issues/175
