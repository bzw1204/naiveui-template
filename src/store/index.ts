import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import useAuthStore from './modules/auth'
import useSettingStore from './modules/settings'

export { useAuthStore, useSettingStore }

const pinia = createPinia()
pinia.use(createPersistedState({ storage: localStorage, auto: true }))

export default pinia
