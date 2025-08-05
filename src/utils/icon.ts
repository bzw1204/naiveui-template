import type { IconProps } from 'naive-ui'
import type { SvgIconType } from '@/components/svg-icon.vue'
import SvgIcon from '@/components/svg-icon.vue'

export function renderIcon(icon?: SvgIconType, props?: IconProps) {
  if (!icon) {
    return
  }

  return () => createIcon(icon, props)
}

export function createIcon(icon?: SvgIconType, props?: IconProps) {
  return h(SvgIcon, {
    name: icon,
    size: props?.size
  })
}
