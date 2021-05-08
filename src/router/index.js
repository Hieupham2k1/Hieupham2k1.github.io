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
				path: 'cats',
				name: 'Cats',
				component: () => import('../views/Cats/Master.vue'),
			},
			{
				path: 'matrix',
				name: 'Matrix',
				component: () => import('../views/Matrix/Master.vue'),
				children: [
					{
						path: '/',
						name: 'Multiply',
						component: () => import('../views/Matrix/Multiply.vue'),
					},
					{
						path: 'add',
						name: 'Add',
						component: () => import('../views/Matrix/Add.vue'),
					},
					{
						path: 'invert',
						name: 'Invert',
						component: () => import('../views/Matrix/Invert.vue'),
					},
				],
			},
			{
				path: 'tanks',
				name: 'Tanks',
				component: () => import('../views/Tanks/Master.vue'),
				children: [
					{
						path: '/',
						name: 'Login',
						component: () => import('../views/Tanks/Login.vue'),
					},
					{
						path: ':roomId/:tankId',
						name: 'Room',
						component: () => import('../views/Tanks/Room.vue'),
					},
					{
						path: ':roomId/:tankId/delete',
						name: 'Delete',
						component: () => import('../views/Tanks/Delete.vue'),
					},
				],
			},
		],
	},
]

const router = new VueRouter({
	routes,
	mode: 'history',
})

export default router
