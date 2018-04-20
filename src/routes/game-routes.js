const KoaRouter = require('koa-router')
const controllers = require('../controllers/index.js')
const router = new KoaRouter({ prefix: '/games' })

router
  .post('/', controllers.game.PostGame)
  .get('/:folder/:timeStamp', controllers.game.GetGame)
  .get('/videos/:folder/:file', controllers.game.PlayGame)
module.exports = router
