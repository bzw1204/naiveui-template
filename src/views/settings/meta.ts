import type { RouteMeta } from 'vue-router'
import Customer from '~icons/carbon/Customer'

const settingsMeta: RouteMeta = {
  title: '系统管理',
  icon: markRaw(Customer),
  order: 3,
  redirect: '/settings/user',
}
export default settingsMeta
