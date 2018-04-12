const compose = require('koa-compose')
const mainRoutes = require('./main-routes')
const userRoutes = require('./user-routes')
const letterRoutes = require('./letter-routes')
const personRoutes = require('./person-routes')
const belongingRoutes = require('./belonging-routes')
const gameRoutes = require('./game-routes')

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
  gameRoutes.routes(),
  gameRoutes.allowedMethods()
])

module.exports = router
