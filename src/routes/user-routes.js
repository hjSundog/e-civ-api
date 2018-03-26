const KoaRouter = require('koa-router')
const controllers = require('../controllers/index.js')
const router = new KoaRouter({ prefix: '/users' })

router
  .get('/', controllers.users.GetAll)
  .get('/:id', controllers.users.GetById)
  .post('/', controllers.users.Signup)
  .post('/login', controllers.users.Login)

module.exports = router
