import type { IAuth } from 'auth'

const useAuthStore = defineStore('auth', {
  state: (): IAuth => ({
    token: '',
    permissions: [],
    useInfo: {
      id: 0,
      account: '',
      mobile: ''
    }
  }),
  getters: {
    isLogin: state => state.token !== ''
  },
  persist: true,
  actions: {

  }
})
export default useAuthStore
