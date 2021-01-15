// import AxiosInterceptorManager from '../types/index'
import { ResolvedFn, RejectedFn } from '../types'
interface Interceptor<T> {
  resolve: ResolvedFn<T>
  reject?: RejectedFn
}
export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolve: ResolvedFn<T>, reject?: RejectedFn): number {
    this.interceptors.push({
      resolve,
      reject
    })
    return this.interceptors.length - 1
  }

  eject(id: number): void {
    // 并不能splice一波干没  这id就乱了
    this.interceptors[id] = null
  }

  /**
   * 提供给外部使用 这也太强了 理解了老半天
   */
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors?.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
