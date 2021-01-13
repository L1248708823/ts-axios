import { isPlainObject } from './util'
/**
 *  规范key大小写一致
 * @param hearders
 * @param normalNam
 */
function normalizeHeaderName(hearders: any, normalName: string): any {
  Object.keys(hearders).forEach(hearder => {
    // 如果名字不相等 且 统一转换成小写后相当 按规范的来
    if (hearder !== normalName && hearder.toLocaleLowerCase() === normalName.toLocaleLowerCase()) {
      hearders[normalName] = hearders[hearder]
      delete hearders[hearder]
    }
  })
  return hearders
}

// JSON格式是必须带Content-Type: application/json;charset=utf-8
export function processHeaders(headers: any, data: any): any {
  headers = normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

/**
 * 把返回回来的headers转成对象
 */
export function parseHeaders(headers: string) {
  const parse = Object.create(null)
  if (!headers) {
    return parse
  }
  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    key = key.trim().toLocaleLowerCase()

    if (!key) {
      return
    }
    if (value) {
      value = value.trim()
    }
    parse[key] = value
  })
  return parse
}

/**
 * 把B的值拷给A
 * @param to
 * @param form
 */
export function extend<T, U>(to: T, form: U): T & U {
  for (const key in form) {
    ;(to as any)[key] = form[key]
  }

  return to as T & U
}
