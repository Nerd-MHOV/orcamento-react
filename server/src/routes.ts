import express from "express";
import fs from "fs";
import { CalcBudgetController } from "./controllers/Budget/CalcBudgetController";
import { CalcBudgetDUController } from "./controllers/Budget/calcBudgetDUcontroller";
import { GetBudgetController } from "./controllers/Budget/GetBudgetControlle";
import { SaveBudgetController } from "./controllers/Budget/SaveBudgetController";
import { CreateCategoryController } from "./controllers/Category/CreateCategoryController";
import { FindCategoryController } from "./controllers/Category/FindCategoryController";
import { CreateCommonDateController } from "./controllers/CommonDate/CreateCommonDateController";
import { FindCommonDateController } from "./controllers/CommonDate/FindCommonDateController";
import { CreateFoodController } from "./controllers/Food/CreateFoodController";
import { FindFoodController } from "./controllers/Food/FindFoodController";
import { FindAllHousingUnits } from "./controllers/HousingUnits/FindAllHousingUnits";
import { CreatePetController } from "./controllers/Pet/CreatePetController";
import { FindPetController } from "./controllers/Pet/FindPetController";
import { ActiveRequirementController } from "./controllers/Requirement/ActiveRequirementController";
import { DeleteRequirementController } from "./controllers/Requirement/DeleteRequirementController";
import { FindRequirementsController } from "./controllers/Requirement/FindRequirementsController";
import { GetaRequirementController } from "./controllers/Requirement/GetaRequiremetController";
import { NewRequirementController } from "./controllers/Requirement/NewRequirementController";
import { PriceRequirementController } from "./controllers/Requirement/PriceRequirementController";
import { CreateSpecificDateController } from "./controllers/SpecificDate/CreateSpecificDateController";
import { FindSpecificDateController } from "./controllers/SpecificDate/FindSpecificDateController";
import { ChangeOrderTariffController } from "./controllers/Tariff/ChangeOrderTariffController";
import { CreateTariffController } from "./controllers/Tariff/CreateTariffController";
import { CreateTariffWithTextController } from "./controllers/Tariff/CreateTariffWithTextController";
import { DeleteTariffController } from "./controllers/Tariff/DeleteTariffController";
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
import { isAdmin } from "./middlewares/isAdmin";

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
const createTariffText = new CreateTariffWithTextController();
const deleteTariff = new DeleteTariffController();
const pipeTariff = new GetNumberPipeController();
const changeOrderTariff = new ChangeOrderTariffController();
const toggleActiveTariff = new ToggleActiveTariffController();

const findTariffValue = new FindTariffValueController();
const createTariffValue = new CreateTariffValueController();

const findCommonDate = new FindCommonDateController();
const createCommonDate = new CreateCommonDateController();

const findSpecificDate = new FindSpecificDateController();
const createSpecificDate = new CreateSpecificDateController();

const newRequirement = new NewRequirementController();
const findRequirements = new FindRequirementsController();
const findaRequirement = new GetaRequirementController();
const deleteRequirement = new DeleteRequirementController();
const findAllHousingUnits = new FindAllHousingUnits();
const activeRequirement = new ActiveRequirementController();
const priceRequirement = new PriceRequirementController();

const calcBudget = new CalcBudgetController();
const calcBudgetDU = new CalcBudgetDUController();
const saveBudget = new SaveBudgetController();
const getBudget = new GetBudgetController();
// const changeDeal = new ChangeDealController();

routes.post("/user", createUser.handle);
routes.post("/login", loginUser.handle);

routes.use(authMiddleware);
routes.delete("/user/:id", isAdmin, deleteUser.handle);
routes.get("/user", isAdmin, findUser.handle);
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
routes.post("/tariff/text", createTariffText.handle);
routes.post("/tariff_pipe", pipeTariff.handle);
routes.post("/tariff/delete", isAdmin, deleteTariff.handle);
routes.post("/tariff/order", changeOrderTariff.handle);
routes.post("/tariff/active", toggleActiveTariff.handle);

routes.get("/tariff-value", findTariffValue.handle);
routes.post("/tariff-value", createTariffValue.handle);

routes.get("/common-date", findCommonDate.handle);
routes.post("/common-date", createCommonDate.handle);

routes.get("/specific-date", findSpecificDate.handle);
routes.post("/specific-date", createSpecificDate.handle);

routes.post("/requirement", newRequirement.handle);
routes.get("/requirement", findRequirements.handle);
routes.post("/requirement/unique", findaRequirement.handle);
routes.get("/housing-units", findAllHousingUnits.handle);
routes.put("/requirement/active/:name", isAdmin, activeRequirement.handle);
routes.put("/requirement/price", isAdmin, priceRequirement.handle);
routes.delete("/requirement/:name", deleteRequirement.handle);

routes.post("/budget", calcBudget.handle);
routes.post("/budget-du", calcBudgetDU.handle);
routes.post("/save-budget", saveBudget.handle);
routes.get("/budget", getBudget.handle);

// routes.post("/pipedrive", changeDeal.handle);
export default routes;
