import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './permission'
import { Message } from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$showError = (resp) => {
  Message.error(resp.message)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
