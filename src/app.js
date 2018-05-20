const Koa2 = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static2')

const SystemConfig = require('./config').System
const DBConfig = require('./config').DB

const path = require('path')
const routes = require('./routes/index')
const ErrorRoutesCatch = require('./middleware/ErrorRoutesCatch')
const ErrorRoutes = require('./routes/error-routes')
const CORS = require('./middleware/CORS')

const customizedLogger = require('./tool/customized-winston-logger')

const jwt = require('jsonwebtoken')
const fs = require('fs')
const mongoose = require('mongoose')
const kafka = require('kafka-node')
// import PluginLoader from './lib/PluginLoader'

global.logger = customizedLogger

mongoose.connect(DBConfig.url, {
  useMongoClient: true
})
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to ' + DBConfig.url)
})
mongoose.connection.on('error', console.error)

const client = new kafka.KafkaClient()
const Producer = kafka.Producer
const producer = new Producer(client)
const KeyedMessage = kafka.KeyedMessage
producer.on('ready', function () {
  console.log('kafka producer ready')
  producer.send([
    { topic: 'websocket-api', partition: 0, messages: ['start'], attributes: 0 }
  ], function (err, result) {
    console.log(err || result)
    process.exit()
  })
})
producer.on('error', function (err) {
  console.log('kafka producer error: ', err)
})

const app = new Koa2()
const env = process.env.NODE_ENV || 'development' // Current mode

const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'))

if (env === 'development') { // logger
  app.use((ctx, next) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  })
}

app
  .use((ctx, next) => {
    if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
      ctx.set('Access-Control-Allow-Origin', '*')
    } else {
      ctx.set('Access-Control-Allow-Origin', SystemConfig.HTTP_server_host)
    }
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access-token')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH')
    ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
    return next()
  })
  .use(ErrorRoutesCatch())
  .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  // 解析头部的access-token并插入ctx的authorization里作之后的权限认证
  .use(async (ctx, next) => {
    /*
     * {
     *   token: string,
     *   payload: object, //if can verify
     *   level: string, // 对应user的权限等级
     *   error: string, // if have some error
     * }
     */
    ctx.header.authorization = {
      token: ctx.header['access-token']
    }
    const { authorization } = ctx.header // 获取jwt

    if (authorization.token) {
      try {
        let decoded = jwt.verify(authorization.token, publicKey) // // 解密，获取payload
        authorization.decoded = {
          ...decoded
        }
      } catch (err) {
        // 验证失败
        console.log('your token verify is not valid ', err)
      }
    }
    console.log('authorization: ', authorization)
    return next()
  })
  .use(KoaBody({
    multipart: true,
    strict: false,
    formidable: {
      uploadDir: path.join(__dirname, '../assets/uploads/tmp'),
      maxFileSize: 100 * 1024 * 1024
    },
    jsonLimit: '100mb',
    formLimit: '10mb',
    textLimit: '10mb'
  })) // Processing request
  // .use(PluginLoader(SystemConfig.System_plugin_path))
  .use((ctx, next) => {
    ctx.kafka = {}
    ctx.kafka.producer = producer
    ctx.kafka.KeyedMessage = KeyedMessage
    next()
  })
  .use(routes)
  .use(ErrorRoutes())
app.listen(SystemConfig.API_server_port)

process.on('uncaughtException', function (err) {
  // 打印出错误
  console.log('unhandlerr:' + err)
  // 打印出错误的调用栈方便调试
  console.log(err.stack)
})
console.log('Now start API server on port ' + SystemConfig.API_server_port + '...')

module.exports = app
