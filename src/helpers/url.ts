import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

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
      } else if (isPlainObject(value)) {
        value = JSON.stringify(value)
      }
      // 字符串数组类型的如bar  转化为 还是bar  {foo:bar} ===> '%7Bfoo%3Abar%7D
      parts.push(`${encode(key)}=${encode(value)}`)
    })
  })

  let serializedParams = parts.join('&')
  // 拼接params
  if (serializedParams) {
    // 首先丢弃 url 中的哈希标记
    const markIndex = url.indexOf('#')
    if (markIndex > -1) {
      url = url.slice(0, markIndex)
    }
  }
  // 拼接考虑原来带不带参数
  url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  return url
}
