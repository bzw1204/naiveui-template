<script lang="ts" setup>
import { PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TitleComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

use([CanvasRenderer, PieChart, TitleComponent, GridComponent, LegendComponent])

const option = reactive({
  color: ['#4792FF', '#7CFFB1', '#FDDD60', '#FF6E79', '#59D9FB'],
  title: {
    text: 'Pie',
    subtext: 'Fake Data'
  },
  legend: {
    show: false
  },
  series: [
    {
      name: '目的ip',
      type: 'pie',
      radius: '50%',

      label: {
        show: true
      },
      itemStyle: {
        borderRadius: 3
      },
      showEmptyCircle: false,
      data: [
        { value: 40, name: '视频广告' },
        { value: 28, name: '搜索引擎' },
        { value: 26, name: '联盟广告' },
        { value: 24, name: '直接访问' },
        { value: 22, name: '邮件推广' }
      ]
    }
  ]
})
</script>

<template>
  <div class="box-border wh-full bg-[#fff] p-12">
    <VChart
      class="chart"
      :option="option"
      :autoresize="true"
      :update-options="{ notMerge: true }"
      style="width: 100%; height: 100%"
    />
  </div>
</template>

<style lang="less" scoped></style>
