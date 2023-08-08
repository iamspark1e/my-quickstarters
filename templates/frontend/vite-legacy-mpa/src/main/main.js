import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import 'vant/lib/index.css';

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history'
})

const store = new Vuex.Store({})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
