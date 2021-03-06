import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import App from './App.vue'
import router from './router'
import MainLayout from './layouts/MainLayout'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'


createApp(App).use(BootstrapVue3).use(router).component('MainLayout', MainLayout).mount('#app')
