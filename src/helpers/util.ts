const _toString = Object.prototype.toString

export function isObject(value: any): value is Object {
  if (!value) {
    return false
  }
  return _toString.call(value) === '[object Object]'
}

export function isDate(value: any): value is Date {
  return _toString.call(value) === '[object Date]'
}
