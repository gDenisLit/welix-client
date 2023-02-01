import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { icons } from '@/plugins/fa-icons'

const app = createApp(App)
library.add(...icons)
app.component(
    'font-awesome-icon',
    FontAwesomeIcon
)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
