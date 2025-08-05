<script setup lang="ts" name="SvgIcon">
// @unocss-include
import type { Component, Raw } from 'vue'

export type SvgIconType = string | Raw<Component> | Component
const { name = '', size = 18 } = defineProps<Props>()

interface Props {
  /** 图标名称 */
  name?: SvgIconType
  size?: string | number
}
const imgURL = computed(
  () => new URL(`@/assets/${name || ''}`, import.meta.url).href
)
</script>

<template>
  <NIcon v-if="typeof name === 'string' && name.includes('i-')" v-bind="$attrs" :size="size">
    <div :class="name" />
  </NIcon>
  <NIcon v-else-if="typeof name === 'object'" :component="name" :size="size" />
  <img v-else :src="imgURL" v-bind="$attrs" :width="size" :height="size">
</template>
