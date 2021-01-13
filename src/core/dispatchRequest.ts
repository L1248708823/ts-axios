import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { bindUrl } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

import xhr from './xhr'
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 * 对config进行规范化处理
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
  // 处理路径
  config.url = transformUrl(config)
  config.headers = transformHeardes(config)
  config.data = transformData(config)
}
/**
 * 处理路径url 拼接params
 */
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bindUrl(url!, params)
}

/**
 * 处理data 如果是对象转JSON
 */
function transformData(config: AxiosRequestConfig): string {
  const { data } = config
  return transformRequest(data)
}

/**
 * 处理请求头 规范大小写 如果是JSON格式补上请求头（没有的情况下）
 */
function transformHeardes(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(response: AxiosResponse): AxiosResponse {
  response.data = transformResponse(response.data)
  return response
}