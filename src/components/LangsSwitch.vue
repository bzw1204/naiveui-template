<script setup lang="ts">
const lang = ref('zh-CN')
const options = [
  {
    label: 'English',
    value: 'enUS'
  },
  {
    label: '中文',
    value: 'zhCN'
  }
]
</script>

<template>
  <n-popselect :value="lang" :options="options" trigger="click">
    <CommonWrapper>
      <icon-park-outline-translate />
    </CommonWrapper>
  </n-popselect>
</template>

<style scoped></style>
