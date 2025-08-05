<script setup lang="ts">
import { Account, Sms } from '.'
</script>

<template>
  <n-flex vertical class=" wh-full ">
    <h1 class="w-full text-center">欢迎回来</h1>
    <n-tabs type="segment" animated pane-class="!pt-20">
      <n-tab-pane name="account" tab="账号登录">
        <Account />
      </n-tab-pane>
      <n-tab-pane name="sms" tab="短信登录">
        <Sms />
      </n-tab-pane>
    </n-tabs>
  </n-flex>
</template>