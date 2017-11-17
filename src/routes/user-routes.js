import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
const router = new KoaRouter({ prefix: '/users' })

router
  .get('/', controllers.users.GetAll)
  .get('/:name', controllers.users.GetByName)
  .post('/', controllers.users.Signup)
  .post('/login', controllers.users.Login)

export default router
