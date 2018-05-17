const KoaRouter = require('koa-router')
const controllers = require('../controllers/index.js')
const router = new KoaRouter({ prefix: '/actions' })

router
  .post('/:action', controllers.actions.doAction)

module.exports = router