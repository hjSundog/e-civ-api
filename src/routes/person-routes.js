import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
const router = new KoaRouter({ prefix: '/persons' })

router
  .get('/:id', controllers.persons.GetById)
  .post('/', controllers.persons.Post)  // create a person

export default router
