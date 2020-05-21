const router = new VueRouter({
	routes: [
		{
		  path: '/',
		  mode: history,
		  name: 'Main',
		  component:  { template: '<div style = "border-radius:20px;background-color:cyan;width:200px;height:50px;margin:10px;font-size:25px;padding:10px;">This is router 1</div>' }
		},
		{
		  path: '/listing',
		  mode: history,
		  name: 'Listing',
		  component:  { template: '<div style = "border-radius:20px;background-color:cyan;width:200px;height:50px;margin:10px;font-size:25px;padding:10px;">This is router 2</div>' }
		},
		{
		  path: '/answering',
		  mode: history,
		  name: 'Answering',
		  props: (route) => ({ questions }),
		  component: Answering
		},
		{
		  path: '/settings',
		  mode: history,
		  props: (route) => ({ questions }),
		  component: Settings
		},
		{ path: '*', redirect: '/' }
	]
});
