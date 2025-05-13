import type { RouteMeta } from 'vue-router'
import FileMarkdownOutlined from '~icons/ant-design/FileMarkdownOutlined'

const markdownMeta: RouteMeta = {
  title: 'Markdown',
  icon: markRaw(FileMarkdownOutlined),
  order: 1
}
export default markdownMeta
