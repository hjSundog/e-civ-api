import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
const router = new KoaRouter({ prefix: '/persons' })

router
  .get('/:id', controllers.persons.GetById)
  .post('/', controllers.persons.Post) // create a person
  .get('/:id/belogings',controllers.persons.GetAllBelogings)
  .get('/:id/belogings/:type',controllers.persons.GetBelogingsOf)

export default router
