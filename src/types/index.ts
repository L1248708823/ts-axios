// 模型
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
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  status: number
  data: any
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

export interface AxiosPromise extends Promise<AxiosResponse> {}
