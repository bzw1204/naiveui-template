import { createHead } from '@unhead/vue/client'
import { createApp } from 'vue'
import App from './App.vue'
import directive from './directives'
import router from './router'
import pinia from './store'
import 'virtual:uno.css'

const app = createApp(App)
const head = createHead()
app.use(directive)
app.use(pinia)
app.use(router)
app.use(head)
app.mount('#app')
