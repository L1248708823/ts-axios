import { AxiosRequestConfig, Method } from './../types/index'
import { isPlainObject, deepMerge } from './util'
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
 * 去掉config里面和defaults合并后的 common、post、get 等属性
 *
 */
export function flattenHeader(headers: any, method: Method) {
  if (!headers) {
    return headers
  }
  // 按功能提取有用的
  // 这就是为什么不直接在defaults的headers里面添加各种 要考虑使用的场景
  // console.log(headers,headers[method]);
  headers = deepMerge(headers['common'] || {}, headers[method] || {}, headers)
  // console.log(headers);
  // 去掉
  debugger
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(key => {
    delete headers[key]
  })
  return headers
}
