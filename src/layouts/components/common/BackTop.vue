<script setup lang="ts">
import BackToTop from '~icons/carbon/BackToTop'
</script>

<template>
  <n-back-top :bottom="80" :visibility-height="300">
    <n-tooltip placement="left" trigger="hover">
      <template #trigger>
        <div wh-full flex-center>
          <BackToTop />
        </div>
      </template>
      <span>返回顶部</span>
    </n-tooltip>
  </n-back-top>
</template>
