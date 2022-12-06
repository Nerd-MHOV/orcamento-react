import express from "express";
import { CalcBudgetController } from "./controllers/Budget/CalcBudgetController";
import { CreateCategoryController } from "./controllers/Category/CreateCategoryController";
import { FindCategoryController } from "./controllers/Category/FindCategoryController";
import { CreateCommonDateController } from "./controllers/CommonDate/CreateCommonDateController";
import { FindCommonDateController } from "./controllers/CommonDate/FindCommonDateController";
import { CreateFoodController } from "./controllers/Food/CreateFoodController";
import { FindFoodController } from "./controllers/Food/FindFoodController";
import { CreatePetController } from "./controllers/Pet/CreatePetController";
import { FindPetController } from "./controllers/Pet/FindPetController";
import { CreateSpecificDateController } from "./controllers/SpecificDate/CreateSpecificDateController";
import { FindSpecificDateController } from "./controllers/SpecificDate/FindSpecificDateController";
import { CreateTariffController } from "./controllers/Tariff/CreateTariffController";
import { FindTariffController } from "./controllers/Tariff/FindTariffController";
import { CreateTariffValueController } from "./controllers/TariffValue/CreateTariffValueController";
import { FindTariffValueController } from "./controllers/TariffValue/FindTariffValueController";
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

const findPet = new FindPetController();
const createPet = new CreatePetController();

const findTariff = new FindTariffController();
const createTariff = new CreateTariffController();

const findTariffValue = new FindTariffValueController();
const createTariffValue = new CreateTariffValueController();

const findCommonDate = new FindCommonDateController();
const createCommonDate = new CreateCommonDateController();

const findSpecificDate = new FindSpecificDateController();
const createSpecificDate = new CreateSpecificDateController();

const calcBudget = new CalcBudgetController();

routes.post("/user", createUser.handle);
routes.post("/login", loginUser.handle);

// routes.use(authMiddleware);
routes.delete("/user", deleteUser.handle);
routes.get("/user", findUser.handle);
routes.get("/validate", validateUser.handle);

routes.get("/food", findFood.handle);
routes.post("/food", createFood.handle);

routes.get("/category", findCategory.handle);
routes.post("/category", createCategory.handle);

routes.get("/pet", findPet.handle);
routes.post("/pet", createPet.handle);

routes.get("/tariff", findTariff.handle);
routes.post("/tariff", createTariff.handle);

routes.get("/tariffvalue", findTariffValue.handle);
routes.post("/tariffvalue", createTariffValue.handle);

routes.get("/commondate", findCommonDate.handle);
routes.post("/commondate", createCommonDate.handle);

routes.get("/specificdate", findSpecificDate.handle);
routes.post("/specificdate", createSpecificDate.handle);

routes.post("/budget", calcBudget.handle);

export default routes;
