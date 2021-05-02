import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Navs/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/',
		name: 'Projects',
		component: () => import('../views/Navs/Projects.vue'),
		children: [
			{
				path: '/cats',
				name: 'Cats',
				component: () => import('../views/Cats/Master.vue'),
			},
		],
	},
]

const router = new VueRouter({
	routes,
	mode: 'history',
})

export default router
