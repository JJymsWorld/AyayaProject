import Vue from 'vue'
import App from './App'
import { myRequest } from './util/request.js'
// import '@fortawesome/fontawesome-free/css/all.min.css'

Vue.prototype.$myRequest = myRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
