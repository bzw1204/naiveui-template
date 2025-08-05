<script setup lang="ts">
import type { ProLayoutMode } from 'pro-naive-ui'

const value = defineModel<ProLayoutMode>('value', { required: true })
</script>

<template>
  <div class="selector-wapper gap-4">
    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <n-el
          :class="{
            'outline outline-2': value === 'vertical',
          }"
          class="grid grid-cols-[20%_1fr] cursor-pointer outline-[var(--primary-color)] hover:(outline-2 outline)"
          @click="value = 'vertical'"
        >
          <div class="bg-[var(--primary-color)]" />
          <div class="bg-[var(--divider-color)]" />
        </n-el>
      </template>
      <span> 垂直布局 </span>
    </n-tooltip>

    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <n-el
          :class="{
            'outline outline-2': value === 'horizontal',
          }"
          class="grid grid-rows-[30%_1fr] cursor-pointer outline-[var(--primary-color)] hover:(outline-2 outline)"
          @click="value = 'horizontal'"
        >
          <div class="bg-[var(--primary-color)]" />
          <div class="bg-[var(--divider-color)]" />
        </n-el>
      </template>
      <span> 水平布局 </span>
    </n-tooltip>

    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <n-el
          :class="{
            'outline outline-2': value === 'two-column',
          }"
          class="grid grid-cols-[10%_15%_1fr] cursor-pointer outline-[var(--primary-color)] hover:(outline-2 outline)"
          @click="value = 'two-column'"
        >
          <div class="bg-[var(--primary-color)]" />
          <div class="bg-[var(--primary-color-suppl)]" />
          <div class="bg-[var(--divider-color)]" />
        </n-el>
      </template>
      <span> 双列布局 </span>
    </n-tooltip>

    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <n-el
          :class="{
            'outline outline-2': value === 'mixed-two-column',
          }"
          class="grid grid-cols-[10%_15%_1fr] grid-rows-[20%_1fr] cursor-pointer outline-[var(--primary-color)] hover:(outline-2 outline)"
          @click="value = 'mixed-two-column'"
        >
          <div class="row-span-2 bg-[var(--primary-color-suppl)]" />
          <div class="row-span-2 bg-[var(--primary-color-suppl)]" />
          <div class="bg-[var(--primary-color)]" />
          <div class="bg-[var(--divider-color)]" />
        </n-el>
      </template>
      <span> 混合双列布局 </span>
    </n-tooltip>

    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <n-el
          :class="{
            'outline outline-2': value === 'sidebar',
          }"
          class="grid grid-cols-[20%_1fr] grid-rows-[20%_1fr] cursor-pointer outline-[var(--primary-color)] hover:(outline-2 outline)"
          @click="value = 'sidebar'"
        >
          <div class="col-span-2 bg-[var(--divider-color)]" />
          <div class="bg-[var(--primary-color)]" />
          <div class="bg-[var(--divider-color)]" />
        </n-el>
      </template>
      <span> 侧边栏布局 </span>
    </n-tooltip>

    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <n-el
          :class="{
            'outline outline-2': value === 'mixed-sidebar',
          }"
          class="grid grid-cols-[20%_1fr] grid-rows-[20%_1fr] cursor-pointer outline-[var(--primary-color)] hover:(outline-2 outline)"
          @click="value = 'mixed-sidebar'"
        >
          <div class="col-span-2 bg-[var(--primary-color)]" />
          <div class="bg-[var(--primary-color-suppl)]" />
          <div class="bg-[var(--divider-color)]" />
        </n-el>
      </template>
      <span> 混合侧边栏布局 </span>
    </n-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.selector-wapper{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.grid{
  height: 60px;
  width: 86px;
  gap:0.4em;
  padding: 0.4em;
  box-shadow: var(--box-shadow-1);
  border-radius: var(--border-radius);
}
.grid > div{
  border-radius: var(--border-radius);
}
</style>
