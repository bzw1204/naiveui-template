## 一.安装

```bash preview
yarn add @unhead/vue
```

官网 [https://unhead.harlanzw.com/](https://unhead.harlanzw.com/)

## 二.挂载

Vue 3

```tsx preview
import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
const app = createApp()
const head = createHead()
app.use(head)
app.mount('#app')
```

Vue 2

```tsx preview
import Vue from 'vue'
import { Vue2ProvideUnheadPlugin, createHead } from '@unhead/vue'

const head = createHead()
Vue.use(Vue2ProvideUnheadPlugin, head)
Vue.use(head)

new Vue({
  el: '#app'
})
```

## 三.使用

```tsx preview
import { useHead } from '@unhead/vue'

const myPage = ref({ description: 'This is my page' })
const title = ref('title')
const myScript = computed(() => ({
  src: 'https://example.com/script.js',
  defer: true
}))

useHead({
  // ref (recommended)
  title,
  // computer getter (recommended)
  meta: [{ name: 'description', content: () => myPage.value.description }],
  // computed (not recommended)
  script: [computed(() => ({
    src: 'https://example.com/script.js',
    defer: true
  }))]
})
```

## 四.进阶玩法 (标题模板)

标题模板允许您以统一的方式呈现页面标题。

使用  `titleTemplate `  键可以为页面标题设置模板。

* 带有 , 的字符串`%s`被替换为`title`

```tsx preview
useHead({
  titleTemplate: 'My Site - %s'
})
```

* 一个函数，它有一个可选的标题作为唯一的参数并返回一个字符串

```tsx preview
useHead({
  titleTemplate: (title?: string) => `${title} - My Site`
})
```

#### 使用

```tsx preview
useHead({ title: 'My Page' })
```

这样网站标题就被渲染成了

`My Page - My Site`

#### 某个特定页面禁用模板

可以设置   `titleTemplate`   为   `null`   .

```tsx preview
useHead({
  titleTemplate: null
})
```

#### 默认标题

```tsx
useHead({
  titleTemplate: (title?: string) => !title ? 'Default title' : `${title} - My Site`
})
```

#### 离开页面小提示

```tsx
let oldtitle: string // 记录旧标题，方便切换回来

function titleTemplate(title?: string) {
  oldtitle = title
  return `${title} - ${useConfig.value?.userInfo?.title}`
}
// 调用原生接口判断是否离开了页面
document.addEventListener('visibilitychange', () => {
  const state = document.visibilityState
  if (state === 'visible') {
    useHead({ title: oldtitle, titleTemplate })
  }
  else if (state === 'hidden') {
    useHead({ title: '啊💔怎么离开了呢💔怎么会?怎么会呢!', titleTemplate: null })
  }
})

useHead({
  titleTemplate
})
```
