import { AxiosStatic, AxiosRequestConfig } from './types/index'
import Axios from './core/axios'
import defaults from './core/defaults'
import mergeConfig from './core/mergeConfig'
import { extend } from './helpers/util'
export function createdInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // const instance = context.request.bind(context)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createdInstance(defaults)
axios.create = function create(config) {
  return createdInstance(mergeConfig(defaults, config))
}
export default axios
