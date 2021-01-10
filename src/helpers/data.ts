import { isPlainObject } from './util'
/**
 * xml只接受 Blob, BufferSource, FormData, URLSearchParams, 或者 USVString 对象.
 * 需要把对象转化为Json格式  如果不是对象利旧
 * @param data
 */
export function transformRequest(data: any) {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 对返回回来的数据做处理 如果返回了JSON 变成对象回去（在不指定responseType的時候，只會返回字符串JSON）
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // 防止意外情況 第一回沒考慮到
    }
  }
  return data
}
