import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
const router = new KoaRouter({ prefix: '/persons' })

router
  .get('/:id', controllers.persons.GetById)
  .post('/', controllers.persons.Post) // create a person
  .post('/:id/belogings', controllers.persons.CreateBelong)
  .get('/:id/belogings', controllers.persons.GetAllBelongs)
  .get('/:id/belogings/:type', controllers.persons.GetBelongsOf)
  .get('/:id/belogings/:belogingsId', controllers.persons.GetBelong)
  .delete('/:id/belogings/:belogingsId', controllers.persons.UseBelong)

export default router
