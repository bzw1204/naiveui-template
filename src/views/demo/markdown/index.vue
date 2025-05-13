<script setup lang="ts">
import HelloWorld from '../../../../README.md'

useHead({
  title: 'Markdown案例',
  link: [computed(() => ({
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css',
    integrity: 'sha512-Oy18vBnbSJkXTndr2n6lDMO5NN31UljR8e/ICzVPrGpSud4Gkckb8yUpqhKuUNoE+o9gAb4O/rAxxw1ojyUVzg==',
    crossorigin: 'anonymous'
  }))]
})
</script>

<template>
  <n-card title="Markdown案例">
    <HelloWorld />
  </n-card>
</template>
