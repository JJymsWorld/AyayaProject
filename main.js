import Vue from 'vue'
import App from './App'
import { myRequest } from './util/request.js'
import { myuploadFile } from './util/request.js'
import { Format } from './util/common.js'
// import '@fortawesome/fontawesome-free/css/all.min.css'
import Request from './js_sdk/luch-request/luch-request/index.js'

Vue.prototype.$myRequest = myRequest
Vue.prototype.$myuploadFile = myuploadFile
Vue.prototype.$Format = Format
Vue.prototype.$Request = Request

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
