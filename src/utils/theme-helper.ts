import { colord } from 'colord'

/**
 * 变换Hover颜色
 * @param color 颜色值
 * @returns 变换后的颜色值
 */
export function transformHoverColor(color: string) {
  const rgb = colord(color).toRgb()
  return colord({
    r: rgb.r + 30,
    g: rgb.g + 13,
    b: rgb.b + 18
  }).toHex()
}

/**
 * 变换Pressed颜色
 * @param color 颜色值
 * @returns 变换后的颜色值
 */
export function transformPressedColor(color: string) {
  const rgb = colord(color).toRgb()
  return colord({
    r: Math.round(rgb.r * 0.5), // 24 * 0.5 = 12
    g: Math.round(rgb.g * 0.763), // 160 * 0.763 = 122
    b: Math.round(rgb.b * 0.761) // 88 * 0.761 = 67
  }).toHex()
}
