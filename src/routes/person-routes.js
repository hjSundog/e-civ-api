import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
const router = new KoaRouter({ prefix: '/persons' })

router
  .get('/:id', controllers.persons.GetById)
  .post('/', controllers.persons.Post) // create a person
  .post('/:id/items', controllers.persons.CreateItem)
  .get('/:id/items', controllers.persons.GetAllItems)
  .get('/:id/items/type/:type', controllers.persons.GetItemsOf)
  .get('/:id/items/:itemId', controllers.persons.GetItem)
  .delete('/:id/items/:itemId', controllers.persons.UseItem)

export default router
