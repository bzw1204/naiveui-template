<script setup lang="ts">

</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button quaternary type="default" :focusable="false" size="small" v-bind="$attrs">
        <template #icon>
          <div class="i-carbon:Settings" />
        </template>
      </n-button>
    </template>
    系统设置
  </n-tooltip>
</template>
