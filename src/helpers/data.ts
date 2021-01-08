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
