import express from "express";
import { CreateCategoryController } from "./controllers/Category/CreateCategoryController";
import { FindCategoryController } from "./controllers/Category/FindCategoryController";
import { CreateFoodController } from "./controllers/Food/CreateFoodController";
import { FindFoodController } from "./controllers/Food/FindFoodController";
import { CreateUserController } from "./controllers/Users/CreateUsersController";
import { DeleteUsersController } from "./controllers/Users/DeleteUsersController";
import { FindUserController } from "./controllers/Users/FindUsersController";
import { LoginUsersController } from "./controllers/Users/LoginUsersController";
import { ValidateUsersController } from "./controllers/Users/ValidateUsersController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = express.Router();

const createUser = new CreateUserController();
const findUser = new FindUserController();
const deleteUser = new DeleteUsersController();
const loginUser = new LoginUsersController();
const validateUser = new ValidateUsersController();

const createFood = new CreateFoodController();
const findFood = new FindFoodController();

const findCategory = new FindCategoryController();
const createCategory = new CreateCategoryController();

routes.post("/user", createUser.handle);
routes.post("/login", loginUser.handle);

routes.use(authMiddleware);
routes.delete("/user", deleteUser.handle);
routes.get("/user", findUser.handle);
routes.get("/validate", validateUser.handle);

routes.get("/food", findFood.handle);
routes.post("/food", createFood.handle);

routes.get("/category", findCategory.handle);
routes.post("/category", createCategory.handle);

export default routes;
