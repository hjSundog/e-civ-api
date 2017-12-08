import Koa2 from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static2'
import {
  System as SystemConfig,
  DB as DBConfig
} from './config'
import path from 'path'
import routes from './routes/index'
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch'
import ErrorRoutes from './routes/error-routes'

import customizedLogger from './tool/customized-winston-logger'

import jwt from 'jsonwebtoken'
import fs from 'fs'
import mongoose from 'mongoose'
// import PluginLoader from './lib/PluginLoader'

global.logger = customizedLogger

mongoose.connect(DBConfig.url)
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to ' + DBConfig.url)
})
mongoose.connection.on('error', console.error)

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
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
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
      }
    }
    console.log('authorization: ', authorization)
    return next()
  })
  .use(KoaBody({
    multipart: true,
    strict: false,
    formidable: {
      uploadDir: path.join(__dirname, '../assets/uploads/tmp')
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  })) // Processing request
  // .use(PluginLoader(SystemConfig.System_plugin_path))
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

export default app
