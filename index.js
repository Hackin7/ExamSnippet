var express = require('express');
var app = express();

var morgan = require('morgan');
// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

var fs = require('fs');

app.get('/', function(req,res){
    //res.send("hi");
    res.redirect('/quiz-vue/index.html')
});
app.use(express.static('public'));

var loginSystem = require('./login/login_server.js');
var login = loginSystem.router;
loginSystem.settings.MAIN_PAGE = "/";
loginSystem.setup(app);
app.use('/login_system', login);

var userQuestionSystem = require('./user_data/userDataRouter.js');
userQuestionSystem.settings.isLoggedIn = loginSystem.isLoggedIn;
app.use('/user_data', userQuestionSystem.router);
///////////////////////////////////////////////////////////////////////////////////////

app.get('/login', function(req,res){
	res.redirect('/login_system/login');
});

app.get('/session', function(req,res){
    res.send(JSON.stringify(req.session.id));
});

app.get('/user_data', function(req,res){
    res.sendFile('./user_data/user_data.html', {root: __dirname });
});

const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listening on ${ port }`));

