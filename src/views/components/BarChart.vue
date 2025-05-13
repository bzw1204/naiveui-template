<script lang='ts' setup>
import { BarChart } from 'echarts/charts'
import { GridComponent, TitleComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

use([CanvasRenderer, BarChart, TitleComponent, GridComponent])

const dataAxis = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const data = [220, 182, 191, 234, 290, 330, 310]
const option = reactive({
  grid: {
    containLabel: true,
    left: '5%',
    right: '5%',
    top: 15,
    bottom: '5%'

  },
  xAxis: {
    data: dataAxis,
    axisLabel: {
      color: '#333'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    },
    alignTicks: false // 关闭 alignTicks 属性
  },
  series: [
    {
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#83bff6' // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: '#188df0' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#188df0' // 100% 处的颜色
            }
          ]
        }
      },

      data
    }
  ]
})
</script>

<template>
  <n-card title="柱状图">
    <VChart class="chart wh-full" :option="option" :autoresize="true" :update-options="{ notMerge: true }" />
  </n-card>
</template>
