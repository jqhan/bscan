const routes = [
	{ path: '/', redirect: '/buildLogs' },
	{ path: '/buildLogs', component: Vue.component('route-list') },
	{ path: '/buildLog/:buildLogID', component: Vue.component('route-booking') }
];

// Create VueRouter
// Docs: https://router.vuejs.org/guide
const router = new VueRouter({
	routes
});

// Create VueApp
// Docs: https://vuejs.org/v2/guide
const app = new Vue({
	// el: '#app' // can't use element property with VueRouter
	router,
	methods: {
		redirect(target) {
			// Used in the navigation
			this.$router.push(target);
		}
	}
}).$mount('#app');
