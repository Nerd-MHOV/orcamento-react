import express from 'express'
import { CreateUserController } from './controllers/Users/CreateUsersController'
import { DeleteUsersController } from './controllers/Users/DeleteUsersController';
import { FindUserController } from './controllers/Users/FindUsersController'
import { LoginUsersController } from './controllers/Users/LoginUsersController';
import { ValidateUsersController } from './controllers/Users/ValidateUsersController';
import { authMiddleware } from './middlewares/authMiddleware';

const routes = express.Router()

const createUser = new CreateUserController();
const findUser = new FindUserController();
const deleteUser = new DeleteUsersController();
const loginUser = new LoginUsersController();
const validateUset = new ValidateUsersController();

routes.post('/user', createUser.handle)
routes.post('/login', loginUser.handle)

routes.use(authMiddleware)
routes.delete('/user', deleteUser.handle)
routes.get('/user', findUser.handle)
routes.get('/validate', validateUset.handle)


export default routes