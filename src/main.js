import Vue from 'vue'
import App from './App.vue'
import { store } from './store/index'
//event bus for manage events between components
export const eventBus = new Vue();

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store: store
}).$mount('#app')