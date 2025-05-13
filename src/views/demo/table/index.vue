<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'

interface RowData {
  key: number
  name: string
  age: number
  address: string
  tags: string[]
}

function createColumns(): DataTableColumns<RowData> {
  return [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: 'Name',
      key: 'name',
      width: 200,
      fixed: 'left'
    },
    {
      title: 'Age',
      key: 'age',
      width: 100,
      fixed: 'left'
    },
    {
      title: 'Row',
      key: 'row',
      render(_row, index) {
        return h('span', ['row', index])
      }
    },
    {
      title: 'Row1',
      key: 'row1',
      render(_row, index) {
        return h('span', ['row ', index])
      }
    },
    {
      title: 'Row2',
      key: 'row2',
      render(_row, index) {
        return h('span', ['row ', index])
      },
      width: 100,
      fixed: 'right'
    },
    {
      title: 'Address',
      key: 'address',
      width: 200,
      fixed: 'right'
    }
  ]
}
const data = Array.from({ length: 100 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`
}))
const columns = createColumns()
const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 100,
  pageCount: 10,
  showSizePicker: true,
  pageSizes: [5, 10, 50, 100],
  onChange: (page: number) => {
    paginationReactive.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    paginationReactive.pageSize = pageSize
    paginationReactive.page = 1
  }
})
const tableRef = ref()
const height = ref(0)
nextTick(() => {
  const siblings = Array.from(tableRef.value.$el.parentNode.children) as HTMLElement[]
  const filteredSiblings = siblings.filter(sibling => sibling !== tableRef.value.$el) // 排除当前元素
  height.value = filteredSiblings.reduce((sum, sibling) => sum + sibling.clientHeight, 0) as number
})
const cardContentHeight = `calc(var(--content-height) - 90px - ${height.value}px)`
const tableStyle = computed(() => {
  return {
    height: cardContentHeight,
    minHeight: cardContentHeight
  }
})
</script>

<template>
  <n-card title="数据表格案例" :content-style="tableStyle">
    <n-data-table
      ref="tableRef" remote :columns="columns" :data="data" :pagination="paginationReactive" :style="{ height: `calc(var(--content-height) - 110px)` }"
      flex-height
    />
  </n-card>
</template>
