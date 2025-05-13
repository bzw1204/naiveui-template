<script setup lang="ts" name="DirectiveDemo">
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const data = ref<string>()
const message = useMessage()
function copyFun() {
  message.success(`复制成功:${data.value}`)
}
function debounceFun() {
  message.success('防抖')
  console.log(data.value)
}
function throttleFun() {
  message.success('节流')
  console.log(data.value)
}
function onDrag(coords: any) {
  console.log('Dragging:', coords)
}
</script>

<template>
  <div class="card content-box">
    <n-card :bordered="false" title="复制指令">
      <n-space>
        <n-input v-model:value="data" placeholder="输入内容试试" style="width: 350px" />
        <n-button v-copy="data" type="warning" @click="copyFun">
          复 制
        </n-button>
      </n-space>
    </n-card>
    <n-card :bordered="false" title="防抖指令" class="mt-8">
      <n-button v-debounce:1000="debounceFun" type="error">
        防抖测试
      </n-button>
    </n-card>
    <n-card :bordered="false" title="节流指令" class="mt-8">
      <n-button v-throttle:500="throttleFun" type="error">
        节流测试
      </n-button>
    </n-card>

    <n-card :bordered="false" title="拖拽指令" class="mt-8">
      鼠标放到矩形上面拖拽试试
    </n-card>
    <div v-draggable="onDrag" class="box" />
  </div>
</template>

<style scoped lang="less">
  .content-box {
    height: 100vh;
    .box {
      width: 100px;
      height: 100px;
      background-color: palevioletred;
      position: absolute;
      z-index: 10000000;
      border-radius: 10px;
      margin: 20px 5px;
    }
  }
</style>
