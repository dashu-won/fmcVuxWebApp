// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'
import vueHome from './components/HelloWorld.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import { XInput, Group, PopupPicker, Selector, XTextarea, Radio } from 'vux'
Vue.component('x-radio', Radio)
Vue.component('x-textarea', XTextarea)
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('popup-picker', PopupPicker)
Vue.component('selector', Selector)
Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [{
  path: '/',
  component: Home
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
