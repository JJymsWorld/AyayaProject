import Vue from 'vue'
import App from './App'
import Mypage from './pages/Mypage/mypage.vue'
import { myRequest } from './util/request.js'

Vue.prototype.$myRequest = myRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
