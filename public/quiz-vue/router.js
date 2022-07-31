const router = new VueRouter({
	routes: [
		{
		  path: '/',
		  mode: history,
		  name: 'Main',
		  component:  {template:`
		  <div >
		  <br>
		  <div style='margin:auto;width: 80%;'>
		  <h1>Exam Snippets</h1>
		  <p>Choose and do random examination questions on your computer! You can self-review your questions or even get the computer to mark MCQ questions! You can even create an account and save your sessions to the database!</p>
		  <p>This currently has Singapore-Cambridge GCE O-Level/ A Level Questions for only a few subjects</p>
		  <p>For more information on the code and how to set up check <a href='https://github.com/Hackin7/ExamSnippet'>here</a></p>
		  <a href="#/search" role="button" class="btn btn-secondary">Search for Question</a>
				<span></span>
				<!--<a href="#/settings" role="button" class="btn btn-secondary">Settings and JSON Save Data</a>-->
		  </div>
		  
			</div>
			
			</div>
		  `}
		},
		{
		  path: '/search',
		  mode: history,
		  name: 'search',
		  props: (route) => ({ session }),
		  component: Search
		},
		{
		  path: '/listing',
		  mode: history,
		  name: 'Listing',
		  props: (route) => ({ questions: session.questions }),
		  component: Listing
		},
		{
		  path: '/answering',
		  mode: history,
		  name: 'Answering',
		  props: (route) => ({ questions: session.questions ,session, sessionUpdate}),
		  component: Answering
		},
		{
		  path: '/settings',
		  mode: history,
		  props: (route) => ({ questions: session.questions, session:session , sessionUpdate}),
		  component: Settings
		},
		{
		  path: '/user_questions',
		  mode: history,
		  name:'user-questions',
		  //props: (route) => ({ questions }),
		  component: userQuestionData
		},
		{
		  path: '/user/sessions',
		  mode: history,
		  name:'user-sessions',
		  //props: (route) => ({ questions }),
		  component: userSessionsData
		},
		{
		  path: '/user/login',
		  mode: history,
		  name:'login-system-login',
		  component: LoginSystemLogin
		},
		{
		  path: '/user/settings',
		  mode: history,
		  name:'login-system-settings',
		  //props: (route) => ({ questions: session.questions }),
		  component: LoginSystemSettings
		},
		{ path: '*', redirect: '/' }
	]
});
