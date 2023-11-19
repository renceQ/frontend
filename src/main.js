import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'




axios.defaults.baseURL="http://backend.test/"

createApp(App).use(router).mount('#app')
