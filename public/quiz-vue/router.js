const router = new VueRouter({
	routes: [
		{
		  path: '/',
		  mode: history,
		  name: 'Main',
		  component:  {template:`
		  <div class="card" style="margin-top:80px">
			<div class="card-header">Select Questions</div>
			<div class="card-body">
				<!--<div class="container"><div class="row">
					<div class="col" ng-repeat="image in Q.images"><img src="{{image}}" alt="No Related image of question here"/></div>
				</div></div> -->
				<a href="#/search" role="button" class="btn btn-secondary">Search for Question</a>
				<span></span>
				<a href="#/settings" role="button" class="btn btn-secondary">Settings and JSON Save Data</a>
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
		  path: '/user/settings',
		  mode: history,
		  name:'login-system-settings',
		  //props: (route) => ({ questions: session.questions }),
		  component: LoginSystemSettings
		},
		{ path: '*', redirect: '/' }
	]
});
