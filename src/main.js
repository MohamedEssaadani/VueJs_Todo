import Vue from 'vue'
import App from './App.vue'

//event bus for manage events between components
export const eventBus = new Vue();

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')