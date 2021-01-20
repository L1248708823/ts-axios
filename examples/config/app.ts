import axios, { AxiosTransformer } from '../../src/index'
import qs from 'qs'

// axios.defaults.headers.common['test2'] = 123
// axios.defaults.headers.post['post'] = 'post>>>>>'
// axios.defaults.headers.post['gey'] = 'giao'
// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })



// const transformRequest = axios.defaults.transformRequest
// console.log(transformRequest);
// axios({
//   transformRequest: [(function(data) {
//     data={a:1,c:3}
//     return qs.stringify(data)
//   }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
//   transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
//     console.log(data);
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then((res) => {
//   console.log(res.data)
// })



const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    console.log(data);
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})