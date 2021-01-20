import { AxiosInstance, AxiosRequestConfig } from './types/index'
import Axios from './core/axios'
import defaults from './helpers/defaults'
import { extend } from './helpers/util'
export function createdInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  // const instance = context.request.bind(context)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createdInstance(defaults)
export default axios
