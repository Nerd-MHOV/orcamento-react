import express from "express";
import fs from "fs";
import { CalcBudgetController } from "./controllers/Budget/CalcBudgetController";
import { CalcBudgetDUController } from "./controllers/Budget/calcBudgetDUcontroller";
import { CreateCategoryController } from "./controllers/Category/CreateCategoryController";
import { FindCategoryController } from "./controllers/Category/FindCategoryController";
import { CreateCommonDateController } from "./controllers/CommonDate/CreateCommonDateController";
import { FindCommonDateController } from "./controllers/CommonDate/FindCommonDateController";
import { CreateFoodController } from "./controllers/Food/CreateFoodController";
import { FindFoodController } from "./controllers/Food/FindFoodController";
import { FindAllHousingUnits } from "./controllers/HousingUnits/FindAllHousingUnits";
import { CreatePetController } from "./controllers/Pet/CreatePetController";
import { FindPetController } from "./controllers/Pet/FindPetController";
// import { ChangeDealController } from "./controllers/Pipedrive/ChangeDealController";
import { FindRequirementsController } from "./controllers/Requirement/FindRequirementsController";
import { CreateSpecificDateController } from "./controllers/SpecificDate/CreateSpecificDateController";
import { FindSpecificDateController } from "./controllers/SpecificDate/FindSpecificDateController";
import { ChangeOrderTariffController } from "./controllers/Tariff/ChangeOrderTariffController";
import { CreateTariffController } from "./controllers/Tariff/CreateTariffController";
import { FindTariffController } from "./controllers/Tariff/FindTariffController";
import { GetNumberPipeController } from "./controllers/Tariff/GetNumberPIpeController";
import { ToggleActiveTariffController } from "./controllers/Tariff/ToggleActiveTariffController";
import { CreateTariffValueController } from "./controllers/TariffValue/CreateTariffValueController";
import { FindTariffValueController } from "./controllers/TariffValue/FindTariffValueController";
import { CreateUserController } from "./controllers/Users/CreateUsersController";
import { DeleteUsersController } from "./controllers/Users/DeleteUsersController";
import { FindUniqueUserController } from "./controllers/Users/FindUniqueUserController";
import { FindUserController } from "./controllers/Users/FindUsersController";
import { LoginUsersController } from "./controllers/Users/LoginUsersController";
import { ValidateUsersController } from "./controllers/Users/ValidateUsersController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = express.Router();

const createUser = new CreateUserController();
const findUser = new FindUserController();
const findUniqueUser = new FindUniqueUserController();
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
const pipeTariff = new GetNumberPipeController();
const changeOrderTariff = new ChangeOrderTariffController();
const toggleActiveTariff = new ToggleActiveTariffController();

const findTariffValue = new FindTariffValueController();
const createTariffValue = new CreateTariffValueController();

const findCommonDate = new FindCommonDateController();
const createCommonDate = new CreateCommonDateController();

const findSpecificDate = new FindSpecificDateController();
const createSpecificDate = new CreateSpecificDateController();

const findRequirements = new FindRequirementsController();
const findAllHousingUnits = new FindAllHousingUnits();

const calcBudget = new CalcBudgetController();
const calcBudgetDU = new CalcBudgetDUController();
// const changeDeal = new ChangeDealController();

routes.post("/user", createUser.handle);
routes.post("/login", loginUser.handle);

routes.use(authMiddleware);
routes.delete("/user", deleteUser.handle);
routes.get("/user", findUser.handle);
routes.get("/validate", validateUser.handle);
routes.post("/unique-user", findUniqueUser.handle);

routes.get("/food", findFood.handle);
routes.post("/food", createFood.handle);

routes.get("/category", findCategory.handle);
routes.post("/category", createCategory.handle);

routes.get("/pet", findPet.handle);
routes.post("/pet", createPet.handle);

routes.get("/tariff", findTariff.handle);
routes.post("/tariff", createTariff.handle);
routes.post("/tariff_pipe", pipeTariff.handle);
routes.post("/tariff/order", changeOrderTariff.handle);
routes.post("/tariff/active", toggleActiveTariff.handle);

routes.get("/tariff-value", findTariffValue.handle);
routes.post("/tariff-value", createTariffValue.handle);

routes.get("/common-date", findCommonDate.handle);
routes.post("/common-date", createCommonDate.handle);

routes.get("/specific-date", findSpecificDate.handle);
routes.post("/specific-date", createSpecificDate.handle);

routes.get("/requirement", findRequirements.handle);
routes.get("/housing-units", findAllHousingUnits.handle);

routes.post("/budget", calcBudget.handle);
routes.post("/budget-du", calcBudgetDU.handle);

// routes.post("/pipedrive", changeDeal.handle);
export default routes;
