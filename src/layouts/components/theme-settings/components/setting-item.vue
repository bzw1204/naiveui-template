<script setup lang="ts" name="SettingItem">
defineOptions({
  name: 'SettingItem'
})

defineProps<Props>()

interface Props {
  /** Label */
  label: string
}
</script>

<template>
  <div class="w-full flex-y-center justify-between">
    <div class="flex flex-1 items-center gap-5 text-nowrap">
      <span class="text-base-text pr-8px">{{ label }}</span>
      <slot name="suffix" />
    </div>
    <div class="w-120 flex-center justify-end">
      <slot />
    </div>
  </div>
</template>
