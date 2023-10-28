import { chainMiddlewares } from './middlewares/chainMiddlewares';
import { dashboardMiddleware } from './middlewares/dashboardMiddleware';
import { jwtMiddleware } from './middlewares/jwtMiddleware';

export default chainMiddlewares([jwtMiddleware, dashboardMiddleware]);
