import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
const router = new KoaRouter({ prefix: '/belongings' })

router
  .get('/:id', controllers.persons.GetById)

export default router
