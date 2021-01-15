// 这边的模型暴露给外面使用 所以定义的内容不一定和类里面的完全一样 可以隐藏细节
// 那下一个问题就是业务开发的时候有没有必要
//
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse<T = any> {
  status: number
  data: T
  statusText: string
  headers: any
  config: AxiosRequestConfig
  // 实际上是XMLrequest对象实例
  request: any
}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request: XMLHttpRequest
  response: AxiosResponse
  isAxiosError: boolean
}

// axios请求
export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  interceptors: {}
}

export interface AxiosInstance extends Axios {
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
}

//  拦截器对象
export interface AxiosInterceptorManager<T> {
  use(resolve: ResolvedFn<T>, reject?: RejectedFn): number
  eject(id: number): void
}

// 如果是request 传入的参数是requestConfig 如果是reject错误都有可能
export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}
export interface RejectedFn {
  (error: any): any
}
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}
