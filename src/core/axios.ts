import { CancelToken } from './../types/index'
import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosResponse,
  ResolvedFn,
  RejectedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import interceptorManager from '../helpers/interceptor'
import mergeConfig from './mergeConfig'
interface Interceptors {
  request: interceptorManager<AxiosRequestConfig>
  response: interceptorManager<AxiosResponse>
}

// 这个就相当于interceptor内部了 因为是for循环出来的
//  ((config: AxiosRequestConfig) => AxiosPromise) 适配dispatch
interface PromiseChain {
  resolve: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)
  reject?: RejectedFn
}
export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors
  // TODO: 这边又有个小问题 为啥不直接定义。。。，要通过构造函数 感觉差不多 不过可能是好看点（误？？？
  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new interceptorManager<AxiosRequestConfig>(),
      response: new interceptorManager<AxiosResponse>()
    }
  }
  // CancelToken?:CancelToken
  // 函数重载 这个设计也太强了 一开始没想到ORZ
  // 对应了两种模式
  //  (url: string, config?: AxiosRequestConfig): AxiosPromise
  // (config: AxiosRequestConfig): AxiosPromise
  request(url: any, config?: AxiosRequestConfig) {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)
    // 处理拦截器逻辑
    const chain: PromiseChain[] = [
      {
        resolve: dispatchRequest,
        reject: undefined
      }
    ]
    // 之所以是 3 2 1 0 1 2 3 的形式
    //         请求  dispatch response
    // 主要是为了执行顺序
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    // 目的是为了 可以生成promise链路 一路then下去
    let promise = Promise.resolve(config!)
    while (chain.length) {
      const { resolve, reject } = chain.shift()!
      promise = promise.then(resolve, reject)
    }
    return promise as Promise<any>
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
