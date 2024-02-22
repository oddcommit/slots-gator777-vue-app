// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import global from './Global'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import 'babel-polyfill'
import Spinner from 'vue-simple-spinner'

Vue.component('vue-simple-spinner', Spinner)

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});

Vue.config.productionTip = false
Vue.prototype.GLOBAL = global

/* eslint-disable no-new */
new Vue({
  router,  //key名字必须命名为router
  render: h => h(App)
}).$mount('#app')