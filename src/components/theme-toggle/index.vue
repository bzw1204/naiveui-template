<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const settingStore = useSettingStore()
const isDark = useDark()
async function toggleDark({ clientX, clientY }: { clientX: number, clientY: number }) {
  function handler() {
    settingStore.toggleTheme()
    useToggle(isDark)()
  }

  if (!document.startViewTransition) {
    return handler()
  }

  const clipPath = [
    `circle(0px at ${clientX}px ${clientY}px)`,
    `circle(${Math.hypot(
      Math.max(clientX, window.innerWidth - clientX),
      Math.max(clientY, window.innerHeight - clientY)
    )}px at ${clientX}px ${clientY}px)`
  ]

  await document.startViewTransition(handler).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 500,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
}
</script>

<template>
  <i
    id="toggleTheme"
    class="mr-16 cursor-pointer"
    :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'"
    @click="toggleDark"
  />
</template>
