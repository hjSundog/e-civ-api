const KoaRouter = require('koa-router')
const controllers = require('../controllers/index.js')
const router = new KoaRouter({ prefix: '/belongings' })

router
  .get('/:id', controllers.persons.GetById)

module.exports = router
