import { isPlainObject } from './util'
/**
 *  规范key大小写一致
 * @param hearders
 * @param normalNam
 */
function normalizeHeaderName(hearders: any, normalName: string): any {
  Object.keys(hearders).forEach(hearder => {
    // 如果名字不相等 且 统一转换成小写后相当 按规范的来
    if (hearder !== normalName && hearder.toLocaleLowerCase() == normalName.toLocaleLowerCase()) {
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
