<script setup lang="ts" name="Log">
const { layoutType, sider, name } = storeToRefs(useSettingsStore())

const hidenLogoText = computed(() => {
  if (['sidebar', 'mixed-sidebar', 'horizontal'].includes(layoutType.value)) {
    return true
  }
  if (['two-column', 'mixed-two-column'].includes(layoutType.value)) {
    return false
  }
  return !sider.value.collapsed
})
</script>

<template>
  <n-flex :wrap="false" inline class=":uno: box-border h-[var(--header-height)] overflow-hidden p-10">
    <div class="flex-center wh-35">
      <div class=":uno: i-local:logo text-35 text-primary" />
    </div>
    <div v-if="hidenLogoText" class=":uno: h-auto flex items-center text-nowrap text-18 font-bold">
      {{ name }}
    </div>
  </n-flex>
</template>

<style scoped></style>
