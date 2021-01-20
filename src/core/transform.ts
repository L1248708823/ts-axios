import { AxiosTransformer } from '../types/index'
/** 转换过程 */
export function transform(data: any, headers: any, fns?: AxiosTransformer | AxiosTransformer[]) {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  // 变相实现了类似链式调用。。  data变更了 然后传给下个管道(fns方法)
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
