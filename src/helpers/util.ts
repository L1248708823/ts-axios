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

/**
 * 混合对象合并
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (!obj) {
      return
    }
    Object.keys(obj)?.forEach(key => {
      const val = obj[key]
      if (isPlainObject(val)) {
        if (isPlainObject(result[key])) {
          result[key] = deepMerge(result[key], val)
        } else {
          result[key] = deepMerge({}, val)
        }
      } else {
        result[key] = val
      }
    })
  })
  console.log(result)
  return result
}
