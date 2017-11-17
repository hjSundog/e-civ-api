import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
const router = new KoaRouter({ prefix: '/letters' })

router
  .get('/', controllers.letters.GetByOwn)
  .post('/', controllers.letters.Post)

export default router
