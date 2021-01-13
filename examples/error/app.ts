// import axios from '../../src/index'
import axios, { AxiosError } from '../../src/index'
// axios({
//   method: 'get',
//   url: '/error/get'
// }).then((res) => {
//   console.log(res)
// }).catch((e) => {
//   console.error(e)
// })

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
