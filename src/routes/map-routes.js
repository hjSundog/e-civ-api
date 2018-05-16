const KoaRouter = require('koa-router')
const controllers = require('../controllers/index.js')
const router = new KoaRouter({ prefix: '/map' })

router
  .get('/relative/resources', controllers.map.resource.GetRelativeResource)
  .get('/relative/buildings', controllers.map.resource.GetRelativeBuildings)

module.exports = router
