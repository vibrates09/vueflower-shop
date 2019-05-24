import _ from 'lodash';
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

new Vue({
  el: '#app',
  render: h => h(App),
  store
})
