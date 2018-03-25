const KoaRouter = require('koa-router')
const controllers = require('../controllers/index.js')
const router = new KoaRouter({ prefix: '/users' })

router
  .get('/', controllers.users.GetAll)
  .get('/:name', controllers.users.GetByName)
  .post('/', controllers.users.Signup)
  .post('/login', controllers.users.Login)

module.exports = router
