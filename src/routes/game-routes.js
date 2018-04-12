const KoaRouter = require('koa-router')
const controllers = require('../controllers/index.js')
const router = new KoaRouter({ prefix: '/game' })

router
  .post('/', controllers.game.Game)

module.exports = router
