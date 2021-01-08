const _toString = Object.prototype.toString

/**
 * 判断对象 这边指的可以是时间 数组等
 * @param value
 */
export function isObject(value: any): value is Object {
  if (!value) {
    return false
  }
  return typeof value === 'object' && value !== null
}

export function isDate(value: any): value is Date {
  return _toString.call(value) === '[object Date]'
}

/**
 *  指普通对象  [object Object]
 */

export function isPlainObject(value: any): value is Object {
  if (!value) {
    return false
  }
  return _toString.call(value) === '[object Object]'
}
