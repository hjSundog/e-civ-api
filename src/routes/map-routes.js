const KoaRouter = require('koa-router')
const controllers = require('../controllers/index.js')
const router = new KoaRouter({ prefix: '/resources' })

router
  .get('/relative', controllers.map.resource.GetRelativeResource)

module.exports = router
