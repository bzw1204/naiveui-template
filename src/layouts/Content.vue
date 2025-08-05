<script setup lang="ts">
const { animationMode } = storeToRefs(useSettingsStore())
</script>

<template>
  <router-view v-slot="{ Component, route }" class="box-border h-[var(--content-height)] flex-1 p-16px" style="background-color: var(--action-color);">
    <transition :name="animationMode" mode="out-in">
      <keep-alive :include="[]">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>
