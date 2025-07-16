<script setup lang="ts" name="SystemSettings" vapor>
const visible = defineModel<boolean>()
</script>

<template>
  <n-drawer
    v-model:show="visible"
    :width="350"
    :show-mask="false"
    :auto-focus="false"
    :mask-closable="false"
  >
    <n-drawer-content title="系统设置" closable :native-scrollbar="false" footer-class="!py-8">
      <n-flex class="w-full" align="center" vertical>
        <n-grid x-gap="12" :cols="2" class="w-full">
          <n-gi>
            菜单折叠
          </n-gi>
          <n-gi>
            <n-switch />
          </n-gi>
        </n-grid>
      </n-flex>
      <template #footer>
        <n-flex>
          <n-button size="small" @click="() => visible = !visible">
            取消
          </n-button>
          <n-button size="small" type="primary">
            确定
          </n-button>
        </n-flex>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
