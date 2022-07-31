var express = require('express');
var bodyParser = require('body-parser');
var questionSystem = express.Router(); 

var SETTINGS = {
	isLoggedIn: (req)=>{}
}

var UserDataDB = require('./userDataDB.js');
var userdb = new UserDataDB(process.env.MONGODB_URL);

questionSystem.use(bodyParser.json());
questionSystem.post('/api/get_question_data', (req, res)=>{
	if (!SETTINGS.isLoggedIn(req)){
		res.status(500).json({error:"You haven't logged in yet!"});
	}else{
		userdb.getData(req.session.userId)
			.then(user => {
				res.json({user:user});
			})
			.catch(error => {
				console.log(error)
				res.status(500).json({error:error});
			});
	}
});

questionSystem.post('/api/get_sessions', (req, res)=>{
	if (!SETTINGS.isLoggedIn(req)){
		res.status(500).json({error:"You haven't logged in yet!"});
	}else{
		userdb.getData(req.session.userId)
			.then(user => {
				res.json({user:user});
			})
			.catch(error => {
				console.log(error)
				res.status(500).json({error:error});
			});
	}
});

questionSystem.post('/api/add_session', (req, res)=>{
	//console.log(req.body);
	if (!SETTINGS.isLoggedIn(req)){
		res.status(500).json({error:"You haven't logged in yet!"});
	}else{
		userdb.addSessions(req.session.userId, [req.body.sessions])
			.then(result => {
				//console.log(result);
				res.json({result:"Done"});
			})
			.catch(error => {
				console.log(error)
				res.status(500).json({result:error});
			});
	}
});

questionSystem.post('/api/add_question', (req, res)=>{
	//console.log(req.body);
	if (!SETTINGS.isLoggedIn(req)){
		res.status(500).json({error:"You haven't logged in yet!"});
	}else{
		userdb.addSessions(req.session.userId, [req.body.question])
			.then(result => {
				//console.log(result);
				res.json({result:"Done"});
			})
			.catch(error => {
				console.log(error)
				res.status(500).json({result:error});
			});
	}
});

questionSystem.post('/api/update_question', (req, res)=>{
	if (!SETTINGS.isLoggedIn(req)){
		res.status(500).json({error:"You haven't logged in yet!"});
	}else{
		userdb.updateSession(req.session.userId, req.body.pos, req.body.question)
			.then(result => {
				//console.log(result);
				res.json({result:"Done"});
			})
			.catch(error => {
				console.log(error)
				res.status(500).json({result:error});
			});
	}
});

questionSystem.post('/api/sessions/remove', (req, res)=>{
	if (!SETTINGS.isLoggedIn(req)){
		res.status(500).json({error:"You haven't logged in yet!"});
	}else{
		userdb.removeSession(req.session.userId, req.body.startDate)
			.then(result => {
				//console.log(result);
				res.json({result:"Done"});
			})
			.catch(error => {
				console.log(error)
				res.status(500).json({result:error});
			});
	}
});

questionSystem.post('/api/sessions/remove/many', (req, res)=>{
	console.log(req.body);
	if (!SETTINGS.isLoggedIn(req)){
		res.status(500).json({error:"You haven't logged in yet!"});
	}else{
		userdb.removeSessions(req.session.userId, req.body.startDates)
			.then(result => {
				//console.log(result);
				res.json({result:"Done"});
			})
			.catch(error => {
				console.log(error)
				res.status(500).json({result:error});
			});
	}
});

questionSystem.post('/api/sessions/addupdate', (req, res)=>{
	console.log(req.body);
	if (!SETTINGS.isLoggedIn(req)){
		res.status(500).json({error:"You haven't logged in yet!"});
	}else{
		userdb.addUpdateSession(req.session.userId, req.body.session)
			.then(result => {
				//console.log(result);
				res.json({result:"Done"});
			})
			.catch(error => {
				console.log(error)
				res.status(500).json({result:error});
			});
	}
});
module.exports = {router:questionSystem, settings:SETTINGS};