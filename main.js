import App from './App'
// import VConsole from 'vconsole'
// new VConsole();

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import dayjs from 'dayjs'
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$dayjs = dayjs;
  return {
    app
  }
}
// #endif