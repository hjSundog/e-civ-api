import compose from 'koa-compose'
import mainRoutes from './main-routes'
import userRoutes from './user-routes'

const router = compose([
  mainRoutes.routes(),
  mainRoutes.allowedMethods(),
  userRoutes.routes(),
  userRoutes.allowedMethods()
])

export default router
