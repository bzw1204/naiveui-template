<script setup lang="ts">
import README from './README.md'

useHead({
  title: 'useHead',
  link: [computed(() => ({
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css',
    integrity: 'sha512-Oy18vBnbSJkXTndr2n6lDMO5NN31UljR8e/ICzVPrGpSud4Gkckb8yUpqhKuUNoE+o9gAb4O/rAxxw1ojyUVzg==',
    crossorigin: 'anonymous'
  }))]
})
</script>

<template>
  <n-card title="useHead 使用教程">
    <README />
  </n-card>
</template>
