import type { RouteMeta } from 'vue-router'
import Types from '~icons/carbon/types'

const tableMeta: RouteMeta = {
  title: 'KeepAlive',
  icon: markRaw(Types),
  order: 5,
  cache: true
}
export default tableMeta
