import express from 'express'
import { CreateUserController } from './controllers/Users/CreateUsersController'
import { DeleteUsersController } from './controllers/Users/DeleteUsersController';
import { FindUserController } from './controllers/Users/FindUsersController'

const routes = express.Router()

const createUser = new CreateUserController();
const findUser = new FindUserController();
const deleteUser = new DeleteUsersController();


routes.get('/user', findUser.handle)
routes.post('/user', createUser.handle)
routes.delete('/user', deleteUser.handle)


export default routes