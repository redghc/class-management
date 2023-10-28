import { chainMiddlewares } from './middlewares/chainMiddlewares';
import { dashboardMiddleware } from './middlewares/dashboardMiddleware';
import { jwtMiddleware } from './middlewares/jwtMiddleware';
import { loginMiddleware } from './middlewares/loginMiddleware';

export default chainMiddlewares([jwtMiddleware, loginMiddleware, dashboardMiddleware]);
