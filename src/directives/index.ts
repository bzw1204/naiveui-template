import type { App } from 'vue'
import throttle from './throttle'

export default function install(app: App) {
  // 节流指令
  app.directive('throttle', throttle)
}
