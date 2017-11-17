import compose from 'koa-compose'
import mainRoutes from './main-routes'
import userRoutes from './user-routes'
import letterRoutes from './letter-routes'
import personRoutes from './person-routes'

const router = compose([
  mainRoutes.routes(),
  mainRoutes.allowedMethods(),
  userRoutes.routes(),
  userRoutes.allowedMethods(),
  letterRoutes.routes(),
  letterRoutes.allowedMethods(),
  personRoutes.routes(),
  personRoutes.allowedMethods()
])

export default router
