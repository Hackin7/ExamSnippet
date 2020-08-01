var express = require('express');
class UserQuestionData{
	constructor(url){
		this.MongoClient = require('mongodb').MongoClient;
		this.dbURL = url || "mongodb://localhost:27017/";
		this.dbName = "exam-snippets";
		this.collection = "usersQuestions"
		
		console.log("Connecting to " + this.dbURL);
		let mgcl = this.MongoClient,  dbURL = this.dbURL, dbName = this.dbName,  collection=this.collection;
		// Creation of Database and Collection
		mgcl.connect(dbURL, function(err, db) {
		  if (err){throw err;}
		  console.log("Database created at "+ dbURL);
		  
		  var dbo = db.db(dbName);
		  dbo.createCollection(collection, function(err, res) {
			if (err){throw err;}
			console.log("Collection created!");
			db.close();
		  });
		});
		
		this.users = [];
	}
	getData(userid){
		let mgcl = this.MongoClient, dbURL = this.dbURL, dbName = this.dbName,  collection=this.collection;
		let promise = new Promise(async function(resolve, reject) {
			mgcl.connect(dbURL, function(err, db) {
				if (err){reject(err);}
				  
				console.log(userid);
				console.log(require('mongodb').ObjectID(userid));
				var dbo = db.db(dbName);
				dbo.collection(collection).findOne({userId:require('mongodb').ObjectID(userid)}, function(err, result) {
					if (err) reject(err); //throw err;
					console.log(result);
					if (!result){
						// Create new user data if doesn't exist ///////////////////////////////////////////////////
						let user = { userId:require('mongodb').ObjectID(userid), sessions:[] };
						dbo.collection(collection).insertOne(user, function(err, res) {
							if (err) throw err;
							console.log("Added user ");
							db.close();
							resolve(user);
						});
						//reject("Could not retrieve user data");//new Error('Database Could not retrieve user'))
					}else{
						resolve(result)
					}
					db.close();
				});
			});
		
		});
		return promise;
	}
	
	
	update(id, updateQuery){
		let usersList = this.users;
		let mgcl = this.MongoClient,  dbURL = this.dbURL, dbName = this.dbName,  collection=this.collection;
		
		let promise = new Promise(async function(resolve, reject) {
			// Connect to Database
			mgcl.connect(dbURL, function(err, db) {
				if (err){reject(err);} //throw err;
				  
				var dbo = db.db(dbName);
				dbo.collection(collection).updateOne({userId:require('mongodb').ObjectID(id)}, updateQuery, function(err, result) {
					if (err) reject(err); //throw err;
					if (!result){
						reject("Could not change data");
					}else{
						result.password = null; // Remove password hash
						resolve(result)
					}
					db.close();
				});
				
			});

			
		});
		return promise;
	}
	
	addSessions(id,newSessions){
		return this.update(id, 
			{$push: {sessions:{
				$each:newSessions,
				$position:0
			} }}
		);
	}
	
	updateSession(id,pos,question){
		var query = {
			$set: {}
		};
		query.$set["sessions$"+pos] = question;
		return this.update(id, query);
	}
	
	addUpdateSession(id, newSession){
		console.log(newSession);
		let db = this;
		let promise = new Promise(async function(resolve, reject) {
			db.removeSession(id, newSession.startDate)
				.then(result => {
					db.addSessions(id, [newSession])
						.then(result => {
							resolve(result);
						})
						.catch(error => {
							reject(error);
						});
				})
				.catch(error => {
					reject(error);
				});
		});
		return promise;
	}
	
	removeSession(id,startDate){
		return this.update(id, {
			'$pull': {"sessions": {"startDate":startDate}}
		});
	}
	
	removeSessions(id,startDates){
		return this.update(id, {
			'$pull': {"sessions": {"startDate":{"$in":startDates}}}
		});
	}
	
}

module.exports = UserQuestionData;