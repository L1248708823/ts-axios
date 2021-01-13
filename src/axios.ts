import { AxiosInstance } from './types/index'
import Axios from './core/axios'
import { extend } from './helpers/headers'
export function createdInstance(): AxiosInstance {
  const context = new Axios()
  // const instance = context.request.bind(context)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createdInstance()
export default axios
