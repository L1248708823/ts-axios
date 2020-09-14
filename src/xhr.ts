// XHR请求
import { AxiosRequestConfig } from './types'
function xhr(config: AxiosRequestConfig): void {
  const {data = null, method='get', url } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
export default xhr