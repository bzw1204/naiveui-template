import { createAlova } from 'alova'
import GlobalFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import type { R } from 'alova-request'
import router from '@/router'

const instance = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  statesHook: VueHook,
  cacheFor: null,
  cacheLogger: false,
  requestAdapter: GlobalFetch(),
  // beforeRequest(method) {
  //   const { token } = storeToRefs(useUserStore())
  //   if (token.value) {
  //     method.config.headers.Authorization = token.value
  //   }
  // },
  responded: {
    onSuccess: async (response) => {
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      const { err_no, data, msg } = (await response.json()) as R<any>
      if (err_no === 503) {
        await router.push({ name: 'Login' })
        return
      }
      if (err_no !== 0) {
        throw new Error(msg)
      }
      return data
    },
    onError: (err) => {
      window.$message?.error(err.message || '服务器异常！')
    },
  },
})

export default instance
