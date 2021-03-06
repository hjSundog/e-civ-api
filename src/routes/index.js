const compose = require('koa-compose')
const mainRoutes = require('./main-routes')
const userRoutes = require('./user-routes')
const letterRoutes = require('./letter-routes')
const personRoutes = require('./person-routes')
const belongingRoutes = require('./belonging-routes')
const gameRoutes = require('./game-routes')
const mapRoutes = require('./map-routes')
const buildignRoutes = require('./building-routes')
const actionRoutes = require('./action-routes')

const router = compose([
  mainRoutes.routes(),
  mainRoutes.allowedMethods(),
  userRoutes.routes(),
  userRoutes.allowedMethods(),
  letterRoutes.routes(),
  letterRoutes.allowedMethods(),
  belongingRoutes.routes(),
  belongingRoutes.allowedMethods(),
  personRoutes.routes(),
  personRoutes.allowedMethods(),
  mapRoutes.routes(),
  mapRoutes.allowedMethods(),
  gameRoutes.routes(),
  gameRoutes.allowedMethods(),
  buildignRoutes.routes(),
  buildignRoutes.allowedMethods(),
  actionRoutes.routes(),
  actionRoutes.allowedMethods()
])

module.exports = router
