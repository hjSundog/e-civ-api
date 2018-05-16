const KoaRouter = require('koa-router')
const controllers = require('../controllers/index.js')
const router = new KoaRouter({ prefix: '/buildings' })

router
  .get('/?type=:type', controllers.buildings.GetTypeOfBuilding)
  .get('/:id', controllers.buildings.GetById)
  .get('/', controllers.buildings.GetAllBuildings)
  .post('/:type', controllers.buildings.CreateBuilding)

module.exports = router
