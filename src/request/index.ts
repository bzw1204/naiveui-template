import type { R } from 'alova-request'
import router from '@/router'
import { createAlovaMockAdapter } from '@alova/mock'
import { createAlova } from 'alova'
import GlobalFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import mock from './mock'

const mockAdapter = createAlovaMockAdapter([mock], {
  // 全局控制是否启用mock接口，默认为true
  enable: true,
  // 非模拟请求适配器，用于未匹配mock接口时发送请求
  httpAdapter: GlobalFetch(),
  // mock接口响应延迟，单位毫秒
  delay: 1000,
  // 是否打印mock接口请求信息
  mockRequestLogger: true
})

const instance = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  statesHook: VueHook,
  cacheFor: null,
  cacheLogger: false,
  // requestAdapter: GlobalFetch(),
  requestAdapter: mockAdapter,
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
      const { code, data, message } = await response.json() as R<any>
      if (code === 503) {
        await router.push({ name: 'Login' })
        return
      }
      if (code !== 200) {
        throw new Error(message)
      }
      return data
    },
    onError: (err) => {
      window.$message?.error(err.message || '服务器异常！')
    }
  }
})

/**
 * JSONP 请求封装
 *
 * @param url url地址
 * @param callbackName 回调函数
 */
export async function jsonp(url: string, callbackName: string) {
  return new Promise((resolve) => {
    const JSONP = document.createElement('script')
    JSONP.type = 'text/javascript'
    JSONP.src = url
    document.getElementsByTagName('head')[0].appendChild(JSONP)
    ;(window as any)[callbackName] = (result: any) => {
      resolve(result)
    }
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP)
    }, 1000)
  }).catch((error) => {
    console.error('获取AK失败', error)
  })
}
export default instance
