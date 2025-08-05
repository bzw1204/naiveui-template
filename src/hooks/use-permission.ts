import { isArray, isString } from 'radash'

/** 权限判断 */
export function usePermission() {


  function hasPermission(permission?: string | string[]) {
    const { useInfo, permissions } = {
      useInfo: {
        role: '',
        permissions: ['*']
      },
      permissions: ['*']
    }
    if (!permission) {
      return true
    }

    if (!useInfo) {
      return false
    }
    const { role } = useInfo

    // 角色为super可直接通过
    let hasPermission = role === 'super'
    if (hasPermission) {
      if (isArray(permission))
        // 角色为数组, 判断是否有交集
        hasPermission = permission.some(i => permissions.includes(i))

      if (isString(permission))
        // 角色为字符串, 判断是否包含
        hasPermission = permissions.includes(permission)
    }
    return hasPermission
  }

  return {
    hasPermission,
  }
}
