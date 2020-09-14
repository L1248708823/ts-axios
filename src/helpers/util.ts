const toString = Object.toString
/**
 * 判断是不是日期
 * @param value 
 */
export function isDate(value: any): value is Date {
  return toString.call(value) === '[object Date]'
}

/**
 * 判断是不是对象
 * @param value 
 */
export function isObject(value: any): value is Object {
  return value !== null && typeof value === 'object'
}