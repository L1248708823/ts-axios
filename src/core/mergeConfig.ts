import { AxiosRequestConfig } from '../types/index'
import { isPlainObject, deepMerge } from '../helpers/util'
// 存放合并方案方法
const strats = Object.create(null)

const stratKeysFromVal2 = ['url', 'data', 'params']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Start
})

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  customizeConfig?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!customizeConfig) {
    customizeConfig = {}
  }
  const config = Object.create(null)

  /**
   * 目的: 不影响原对象
   */
  for (let key in customizeConfig) {
    mergeField(key)
  }

  for (let key in defaultConfig) {
    if (!customizeConfig[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    // todo
    const strat = strats[key] || defaultStart
    // ps: 这边ts认定customizeConfig为空应该是因为多套了一层函数
    config[key] = strat(defaultConfig[key], customizeConfig![key])
  }
  return config
}

/**
 * 默认的配置 有值回值 没值就默认
 * 传进来的值不确定 只能疯狂any 我整个人都any了
 */
function defaultStart(defaultVal: any, customizeVal: any): any {
  return customizeVal !== undefined ? customizeVal : defaultVal
}

/**
 *  特定配置如 url、params、data
 *  默认配置没意义，它们是和每个请求强相关的
 *  只返回自定义配置的
 */

function fromVal2Start(defaultVal: any, customizeVal: any) {
  //  错误写法。。第一遍是这么写的 写业务写习惯了 多注意多注意
  //  if(customizeVal) {
  //    return customizeVal
  //  }
  if (typeof customizeVal !== 'undefined') {
    return customizeVal
  }
}

/** 合并对象 如headers */
function deepMergeStrat(defaultVal: any, customizeVal: any) {
  console.log(defaultVal, customizeVal)
  if (isPlainObject(customizeVal)) {
    console.log(deepMerge(defaultVal, customizeVal))
    return deepMerge(defaultVal, customizeVal)
  } else if (typeof customizeVal !== 'undefined') {
    return customizeVal
  } else if (isPlainObject(defaultVal)) {
    return deepMerge(defaultVal)
  } else if (typeof defaultVal !== 'undefined') {
    return defaultVal
  }
}
