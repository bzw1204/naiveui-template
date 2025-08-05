/**
 * 将给定的数组转换为树形结构。
 * @param arr - 原始数组，其中每个元素包含id和pid属性，pid表示父级id。
 * @returns 返回转换后的树形结构数组。
 */
export function arrayToTree<T extends { id: number, pid: number, children?: T[] }>(arr: T[]) {
  // 初始化结果数组
  const res: T[] = []
  // 使用Map存储数组元素，以id为键，元素本身为值
  const map = new Map()

  // 遍历数组，将每个元素以id为键存储到Map中
  arr.forEach((item) => {
    map.set(item.id, item)
  })

  // 再次遍历数组，根据pid将元素组织成树形结构
  arr.forEach((item) => {
    const pid = item.pid ?? 0
    // 获取当前元素的父级元素
    const parent = map.get(pid)
    // 如果有父级元素
    if (parent) {
      // 如果父级元素已有子元素，则将当前元素追加到子元素数组中
      if (parent?.children) {
        parent.children.push(item)
      } else { // 如果父级元素没有子元素，则创建子元素数组，并将当前元素作为第一个元素
        parent.children = [item]
      }
    } else { // 如果没有父级元素，则将当前元素直接添加到结果数组中
      res.push(item)
    }
  })
  // 返回组织好的树形结构数组
  return res
}

/**
 * 将数组转换为树形结构
 * @param data 原始数组
 * @param keyField 用作键的字段名，默认为 'path'
 * @param childrenField 用作子节点的字段名，默认为 'children'
 * @returns 树形结构的数组
 */
export function convertRouteToTree<
  T extends Record<string, any>,
  K extends keyof T,
  C extends keyof T
>(
  data: T[],
  keyField: K = 'path' as K,
  childrenField: C = 'children' as C
): T[] {
  const map: { [key: string]: T } = data.reduce((acc: { [key: string]: T }, item) => {
    const key: string = String(item[keyField])
    acc[key] = item
    return acc
  }, {})

  const tree = data.reduce((result: T[], item) => {
    const keyValue = String(item[keyField])
    const match = keyValue.match(/(.+)\/[^\\/]+$/)
    if (match) {
      const parentPath = match[1]
      const parent = map[parentPath]

      if (parent) {
        if (!parent[childrenField]) {
          (parent as any)[childrenField] = []
        }
        ;(parent[childrenField] as T[]).push(item)
      }
    } else {
      result.push(item)
    }

    return result
  }, [])

  return tree
}
