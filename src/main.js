import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import { clickOutsideDirective } from './directives'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { FAICONS } from './icons'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import VueLoading from 'vue-loading-overlay'
import Notifications from '@kyvg/vue3-notification'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'ant-design-vue/dist/antd.css'
import '@/assets/styles/styles.scss'

library.add(FAICONS)
const app = createApp(App)
app.use(router)
app.use(store)
app.use(Antd)
app.use(Notifications)
app.use(VueLoading)
app.use(
  VueGoogleMaps, 
  {load: { key: 'AIzaSyB2LvYaoUdowiLafGevBgmTajpfYiEAj4o' },
})
app.directive('click-outside', clickOutsideDirective)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
