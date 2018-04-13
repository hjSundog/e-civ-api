const KoaRouter = require('koa-router')
const controllers = require('../controllers/index.js')
const router = new KoaRouter({ prefix: '/persons' })

router
  .get('/:id', controllers.persons.GetById)
  .post('/', controllers.persons.Post) // create a person
  .delete('/:id', controllers.persons.Delete)
  .post('/:id/items', controllers.persons.CreateItem)
  .get('/:id/items', controllers.persons.GetAllItems)
  .get('/:id/items/type/:type', controllers.persons.GetItemsOf)
  .get('/:id/items/:itemId', controllers.persons.GetItem)
  .delete('/:id/items/:itemId', controllers.persons.UseItem)
  .post('/avatar', controllers.persons.Avatar)
module.exports = router
