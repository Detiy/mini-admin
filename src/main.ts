import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router"
import 'font-awesome/css/font-awesome.min.css';
import 'element-plus/dist/index.css'

import { loadPlugins } from "@/plugins"

const app = createApp(App)

loadPlugins(app)

app.use(router).mount('#app')
