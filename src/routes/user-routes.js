import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
const router = new KoaRouter({ prefix: '/users' })

router
  .get('/:name', controllers.users.GetByName)
  .post('/', controllers.users.Post)

export default router
