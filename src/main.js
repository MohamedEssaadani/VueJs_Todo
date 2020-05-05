import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from './store/index'
import Master from './components/layouts/Master'
import routes from './routes/routes'
//event bus for manage events between components
export const eventBus = new Vue();

Vue.config.productionTip = false

//use vue router
Vue.use(VueRouter);



//create new router instance & give the constructor the routes array
const router = new VueRouter({
    routes: routes,
    mode: 'history'

})

new Vue({
    render: h => h(Master),
    router: router,
    store: store
}).$mount('#app')