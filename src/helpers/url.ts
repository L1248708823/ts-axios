import { isDate } from './util'
import { isObject } from 'util'

export function bindUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }
  let parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    // 过滤无效的
    if (typeof val === 'undefined' || val === null) {
      return
    }

    let values: string[] = []
    // 统一转化成数组的形式 方便后面处理
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(value => {
      if (isDate(value)) {
        value = value.toISOString()
      } else if (isObject(value)) {
        value = JSON.stringify(value)
      }
    })
  })
  return url
}
