<script setup lang="ts">
import { customFormula } from '@/components/formula'
</script>

<template>
  <n-tabs type="line" animated default-value="tools">
    <n-tab-pane name="tools" tab="快捷工具">
      <n-flex>
        <n-popover v-for="(tool, i) in customFormula" :key="i" trigger="click" placement="bottom-start">
          <template #trigger>
            <n-flex vertical class="bg-[#f5f5f5] px-10 py-2 text-center hover:cursor-pointer hover:bg-[#eaeaea]">
              <div class="flex flex-1 flex-col items-center justify-center">
                <n-equation :value="tool.expression" />
              </div>
              <span class="text-10">
                {{ tool.title }}
              </span>
            </n-flex>
          </template>
          <n-flex vertical class="w-500">
            <n-scrollbar trigger="none" class="max-h-300">
              <n-flex v-for="item in tool.list" :key="item.title" vertical class="pr-20">
                <span>{{ item.title }}</span>
                <n-flex :vertical="tool.flexCol || false">
                  <n-flex
                    v-for="x in item.items" :key="x" justify="center" align="center" class="min-h-30 min-w-30 flex-1 bg-[#f5f5f5] px-4 hover:cursor-pointer" k=""
                  >
                    <n-equation :value="x" />
                  </n-flex>
                </n-flex>
              </n-flex>
            </n-scrollbar>
          </n-flex>
        </n-popover>
      </n-flex>
    </n-tab-pane>
    <n-tab-pane name="upload" tab="图片识别">
      Hey Jude
    </n-tab-pane>
  </n-tabs>
</template>
