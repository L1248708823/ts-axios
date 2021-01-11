// XHR请求
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, method = 'get', url, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)

    // 设置请求头
    Object.keys(headers).forEach(key => {
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      } else {
        request.setRequestHeader(key, headers[key])
      }
    })

    //  判断请求类型
    if (responseType) {
      request.responseType = responseType
    }

    // 请求响应变化 同时处理200-300的网络异常
    request.onreadystatechange = function handleLoad() {
      // 请求没完成就退出
      if (request.readyState !== 4) {
        return
      }
      // 请求状态码等于0  超时错误或者网络错误
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = request.responseType === 'text' ? request.responseText : request.response
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      handleResponse(response)
    }

    // 捕获网络异常错误
    request.onerror = () => {
      reject(new Error('Network Error'))
    }

    // 默认是0 永不超时
    if (timeout) {
      request.timeout = timeout
    }
    // 捕获超时异常
    request.ontimeout = () => {
      reject(new Error('Timeout Error'))
    }

    // 知识点 函数里面套函数调用 严格来说promise也是一个类
    // 处理请求异常
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.status}`))
      }
    }
    // 发送
    request.send(data)
  })
}

export default xhr
