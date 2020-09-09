import Vue from 'vue'
import App from './App.vue'
import devLogPlugin from './plugins/devLog'

Vue.use(devLogPlugin)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
