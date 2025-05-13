<script setup lang="ts">
import type { Component } from 'vue'
import BarChart from '@/views/components/BarChart.vue'
// import PieChart from '@/views/components/PieChart.vue'
import RadarChart from '@/views/components/RadarChart.vue'
import IconAccessPoint from '~icons/tabler/AccessPoint'
import IconAdjustments from '~icons/tabler/Adjustments'
import IconAlertCircle from '~icons/tabler/AlertCircle'
import IconBox from '~icons/tabler/Box'
import IconBrandAppleArcade from '~icons/tabler/BrandAppleArcade'
import IconClipboardList from '~icons/tabler/ClipboardList'
import IconJumpRope from '~icons/tabler/JumpRope'
import IconShape from '~icons/tabler/Shape'
import IconUnlink from '~icons/tabler/Unlink'

const quickAccess: { title: string, icon: Component, href: string }[] = [
  {
    title: 'Alova',
    icon: IconUnlink,
    href: ''
  },
  {
    title: 'NaiveUI',
    icon: IconJumpRope,
    href: ''
  },
  {
    title: 'XIcons',
    icon: IconShape,
    href: ''
  },
  {
    title: 'Vueuse',
    icon: IconJumpRope,
    href: ''
  }
]
const statistics = [
  {
    title: '用户统计',
    icon: IconAccessPoint,
    numbers: 99
  },
  {
    title: '日志处理',
    icon: IconClipboardList,
    numbers: 999
  },
  {
    title: '异常事件',
    icon: IconAdjustments,
    numbers: 126
  },
  {
    title: '安全威胁',
    icon: IconAlertCircle,
    numbers: 355
  },
  {
    title: '攻击事件',
    icon: IconBox,
    numbers: 100245
  },
  {
    title: '探针部署',
    icon: IconBrandAppleArcade,
    numbers: 245
  }
]
</script>

<template>
  <n-el>
    <n-grid :cols="6" :x-gap="16" :y-gap="16">
      <n-gi v-for="statistic in statistics" :key="statistic.title">
        <div class="shadow-box p-12">
          <n-statistic :label="statistic.title" tabular-nums>
            <n-number-animation :from="0" :to="statistic.numbers" />
            <template #prefix>
              <n-icon :component="statistic.icon" :size="32" color="#18a058" />
            </template>
          </n-statistic>
        </div>
      </n-gi>

      <n-gi :span="4">
        <n-flex vertical :size="16">
          <n-card title="资产数据看板">
            <template #header-extra>
              <n-button type="primary" text>
                全部资产
              </n-button>
            </template>
            <n-grid :cols="3" :x-gap="16">
              <n-gi>
                <n-card title="今日访问量" hoverable size="small">
                  <div class="mb-8 flex items-center text-18">
                    12560
                    <span class="ml-12 text-12 text-[#999]">较上周新增：100</span>
                  </div>
                </n-card>
              </n-gi>
              <n-gi>
                <n-card title="新增用户" hoverable size="small">
                  <div class="mb-8 flex items-center text-18">
                    12560
                    <span class="ml-12 text-12 text-[#999]">较上周新增：100</span>
                  </div>
                </n-card>
              </n-gi>
              <n-gi>
                <n-card title="当月订单量" hoverable size="small">
                  <div class="mb-8 flex items-center text-18">
                    12560
                    <span class="ml-12 text-12 text-[#999]">较上周新增：100</span>
                  </div>
                </n-card>
              </n-gi>
            </n-grid>
          </n-card>
          <!-- 最新动态（包含日志分析、探针发现、蜜罐告警等） -->
          <n-card title="最新动态（包含日志分析、探针发现、蜜罐告警等）">
            <template #header-extra>
              <n-button type="primary" text>
                查看更多
              </n-button>
            </template>
            <n-list>
              <n-list-item v-for="item in 6" :key="item">
                <div class="">
                  最新动态-{{ item }}
                </div>
                <div class="mt-8 flex items-center text-[#999]">
                  <div class="flex-1 truncate">
                    内容内容内容内容内容内容内容内容
                  </div>
                  <span>2024/02/08</span>
                </div>
              </n-list-item>
            </n-list>
          </n-card>
        </n-flex>
      </n-gi>
      <n-gi :span="2">
        <n-grid :cols="1" :y-gap="16" item-responsive>
          <n-gi>
            <n-card title="快捷入口" content-class="min-h-120">
              <n-flex>
                <n-button
                  v-for="x in quickAccess" :key="x.title" text tag="a" :href="x.href" target="_blank"
                  type="primary"
                >
                  <template #icon>
                    <n-icon :component="x.icon" />
                  </template>
                  {{ x.title }}
                </n-button>
              </n-flex>
            </n-card>
          </n-gi>
          <n-gi>
            <BarChart class="h-265" />
          </n-gi>
          <n-gi>
            <RadarChart class="h-265" />
          </n-gi>
        </n-grid>
      </n-gi>
    </n-grid>
  </n-el>
</template>

<style lang="less" scoped>
.shadow-box {
  box-sizing: border-box;
  background-color: var(--card-color);
  border-radius: var(--border-radius);
  border: 1px solid var(--divider-color);
  overflow: hidden;
}
</style>
