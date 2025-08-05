export * from './array'
export * from './byte-helper'
export * from './icon'
export * from './route'
export * from './theme-helper'

/**
 * 判断是否是外部链接
 * @param path 路径
 * @returns 是否是外部链接
 */
export function isExternal(path: string) {
  return /^(?:https?:|mailto:|tel:)/.test(path)
}
