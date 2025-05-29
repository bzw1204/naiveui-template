import type { App } from 'vue'
import copy from './copy'
import debounce from './debounce'
import draggable from './draggable'
import resize from './resize'
import throttle from './throttle'

export default function install(app: App) {
  app.directive('resize', resize)
  // 复制指令
  app.directive('copy', copy)
  // 防抖指令
  app.directive('debounce', debounce)
  // 节流指令
  app.directive('throttle', throttle)
  // 拖拽指令
  app.directive('draggable', draggable)
}
