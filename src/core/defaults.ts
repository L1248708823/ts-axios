import { AxiosRequestConfig } from '../types/index'
import { processHeaders } from '../helpers/headers'
import { transformRequest, transformResponse } from '../helpers/data'
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,

  headers: {
    /**
     * text/plain： 窗体数据以纯文本形式进行编码，其中不含任何控件或格式字符。
     */
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  transformRequest: [
    function(data: any, headers: any) {
      headers = processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any) {
      return transformResponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'options', 'head']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  // form 表单
  /**
   * application/x-www-form-urlencoded： 窗体数据被编码为名称/值对。
   * 这是标准的编码格式。 multipart/form-data： 窗体数据被编码为一条消息，页上的每个控件对应消息中的一个部分。
   */
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
