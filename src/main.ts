import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'
import directive from './directives'
import router from './router'
import 'virtual:uno.css'
import './assets/styles/transition.css'

const app = createApp(App)
const head = createHead()
const pinia = createPinia()
pinia.use(createPersistedState({ storage: localStorage, auto: true }))

app.use(directive)
app.use(pinia)
app.use(router)
app.use(head)
app.mount('#app')
