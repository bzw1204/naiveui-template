<script setup lang="ts">
import { ThemeToggle } from '@/components'
import Notices from '../header/Notices.vue'
import Search from '../header/Search.vue'
import UserCenter from '../header/UserCenter.vue'
import Setting from './Setting.vue'

const emits = defineEmits<{
  showSetting: []
}>()
const showDrawer = defineModel<boolean>('show', { default: false })
</script>

<template>
  <n-drawer
    v-model:show="showDrawer"
    :width="280"
    placement="right"
    :mask-closable="true"
    :close-on-esc="true"
  >
    <n-drawer-content :native-scrollbar="false" :body-content-style="{ padding: '0' }">
      <template #header>
        <div class="flex items-center">
          <UserCenter />
          <div class="ml-auto" />
          <Search />
          <Notices />
        </div>
      </template>

      <slot />

      <template #footer>
        <ThemeToggle />
        <div class="ml-auto" />
        <Setting @click="() => emits('showSetting')" />
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
