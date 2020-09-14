/**
 * 需求：
 * 参数值为数组
 * 参数值为对象
 * 参数值为 Date 类型
 * 特殊字符支持
 * 空值忽略
 * 丢弃 url 中的哈希标记
 * 保留 url 中已存在的参数
 * 详情见文档
 */
import { isDate, isObject } from './util' 

/**
 * 把json转成code 同时保留几个特殊的字符
 */
function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function bulidURL (url: string, params?: any) {
  // 首先判断params存在, 其次针对key值做数组化兼容处理
  if(!params) {
    return url
  }
  const parts: string[] = []

  const keys = Object.keys(params)
  keys.forEach(key =>{
    const value = params[key]
    // 过滤空值
    if(!value || value === null || typeof value === 'undefined') {
      return
    }

    let values: string[]
    // 考虑是数组的情况
    if(Array.isArray(value)) {
      values = value
      // 先统一换成数组的形式
      key+='[]'
    } else {
      values = [value]
    }

    // 遍历value值进行拼接
    values.forEach(value => {
       if(isDate(value)) {
        value = value.toISOString()
       } else if(isObject(value)) {
         value = JSON.stringify(value)
       }
        // encode encode的同时保留几个特殊的字符
       parts.push(`${encode(key)}=${encode(value)}`)
    })
  })

  let serializedParams = parts.join('&')

  // 需要去掉#hash/兼容之前已存在的参数 
  if(serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    // 之前存在参数的情况下
    url += (url.indexOf('?') === -1? '?' : '&') + serializedParams
  }
  return url
}