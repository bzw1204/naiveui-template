import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import useAuthStore from './modules/auth'
import useSettingStore from './modules/settings'
import useThemeStore from './modules/themes'

export { useAuthStore, useSettingStore, useThemeStore }

const pinia = createPinia()
pinia.use(createPersistedState({ storage: localStorage, auto: true }))

export default pinia
