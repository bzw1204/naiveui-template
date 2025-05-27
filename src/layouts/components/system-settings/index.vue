<script setup lang="ts" name="SystemSettings">
const visible = defineModel<boolean>()
</script>

<template>
  <n-drawer v-model:show="visible" :width="502" :auto-focus="false">
    <n-drawer-content title="系统设置" closable :native-scrollbar="false" footer-class="!py-8">
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
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
