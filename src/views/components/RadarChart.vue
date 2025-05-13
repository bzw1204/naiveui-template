<script lang='ts' setup>
import { RadarChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TitleComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { reactive } from 'vue'
import VChart from 'vue-echarts'

use([CanvasRenderer, RadarChart, TitleComponent, GridComponent, LegendComponent])

const option = reactive({
  color: ['#4792FF', '#7CFFB1', '#FDDD60', '#FF6E79', '#59D9FB'],
  radar: {
    indicator: [
      { name: 'Sales' },
      { name: 'Administration' },
      { name: 'Information Technology' },
      { name: 'Customer Support' },
      { name: 'Development' },
      { name: 'Marketing' }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
})
</script>

<template>
  <n-card title="Radar">
    <VChart
      class="chart wh-full" :option="option" :autoresize="true" :update-options="{ notMerge: true }"
    />
  </n-card>
</template>
