import axios from '../../src/index'

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// // axios.get('/extend/get')
// axios('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post', { msg: 'post' })

// axios.put('/extend/put', { msg: 'put' })

// axios.patch('/extend/patch', { msg: 'patch' })

// 泛型的例子TAT

class ResponseData<T> {
  status: number
  data: T
  message: string
}

class User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user').then(res => {
    return res.data
  })
}

async function test() {
  const user = await getUser<User>()
  console.log(user.data.age)
}
test()
