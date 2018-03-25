const KoaRouter = require('koa-router')
const controllers = require('../controllers/index.js')
const router = new KoaRouter({ prefix: '/letters' })

router
  .get('/', controllers.letters.GetByOwn)
  .post('/', controllers.letters.Post)

module.exports = router
