import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignIn from './views/auth/SignIn';
import SignUp from './views/auth/SignUp';
import User from './views/User';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/iniciar',
			name: 'signin',
			component: SignIn
		},
		{
			path: '/registro',
			name: 'signup',
			component: SignUp
		},
		{
			path: '/user/:id',
			name: 'user',
			component: User,
			props: true
		}
	]
});
