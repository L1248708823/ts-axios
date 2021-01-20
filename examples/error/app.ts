// import axios from '../../src/index'
import axios, { AxiosError } from '../../src/index'
import {isPlainObject} from '../../src/helpers/util'
// axios({
//   method: 'get',
//   url: '/error/get'
// }).then((res) => {
//   console.log(res)
// }).catch((e) => {
//   console.error(e)
// })
console.log(isPlainObject([1,2]), Object.prototype.toString.call([1,2]))
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log(res)
    })
    .catch((e: AxiosError) => {
      console.error(e.message)
      console.log(e.request)
    })
}, 1000)

// 超时处理
// axios({
//   method: 'get',
//   url: '/error/timeout',
//   timeout: 2000
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch((e: AxiosError) => {
//     console.error(e)
//   })
