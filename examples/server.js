const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
// const path = require('path')

// require('./server2')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
    colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cookieParser())

// app.use(multipart({
//   uploadDir: path.resolve(__dirname, 'upload-file')
// }))

const router = express.Router()

registerSimpleRouter()
registerBaseRouter()
registerErrorRouter()
registerExtendRouter()
registerConfigRouter()
app.use(router)

const port = process.env.PORT || 9000

module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
function registerSimpleRouter() {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: `hello world`
    })
  })
}

function registerBaseRouter() {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', chunk => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter() {
  // 错误处理
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      // res.status(500)
      res.body = {
        message: '出现了一个未知的错误',
        errorCode: 999 //未知错误码可以特殊一点
      }
      res.status = 500
      res.end()
    }
  })

  // 超时
  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}
function registerExtendRouter() {
  router.get('/extend/get', function(req, res) {
    res.json({
      msg: `hello world`
    })
  })
  router.options('/extend/options', function(req, res) {
    res.end()
  })
  router.delete('/extend/delete', function(req, res) {
    res.end()
  })
  router.head('/extend/head', function(req, res) {
    res.end()
  })

  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })

  //  泛型
  router.get('/extend/user', function(req, res) {
    res.json({
      status: 200,
      message: '加油加油、',
      data: {
        age: 15,
        name: 'iceNa'
      }
    })
  })
}


function registerConfigRouter() {
  router.post('/config/post', function(req, res) {
    res.json({
      status: 200,
      message: '加油你是最胖的',
      data:req.body
    })
  })
}