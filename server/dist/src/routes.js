"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var CalcBudgetController_1 = require("./controllers/Budget/CalcBudgetController");
var calcBudgetDUcontroller_1 = require("./controllers/Budget/calcBudgetDUcontroller");
var CreateCategoryController_1 = require("./controllers/Category/CreateCategoryController");
var FindCategoryController_1 = require("./controllers/Category/FindCategoryController");
var CreateCommonDateController_1 = require("./controllers/CommonDate/CreateCommonDateController");
var FindCommonDateController_1 = require("./controllers/CommonDate/FindCommonDateController");
var CreateFoodController_1 = require("./controllers/Food/CreateFoodController");
var FindFoodController_1 = require("./controllers/Food/FindFoodController");
var FindAllHousingUnits_1 = require("./controllers/HousingUnits/FindAllHousingUnits");
var CreatePetController_1 = require("./controllers/Pet/CreatePetController");
var FindPetController_1 = require("./controllers/Pet/FindPetController");
// import { ChangeDealController } from "./controllers/Pipedrive/ChangeDealController";
var FindRequirementsController_1 = require("./controllers/Requirement/FindRequirementsController");
var CreateSpecificDateController_1 = require("./controllers/SpecificDate/CreateSpecificDateController");
var FindSpecificDateController_1 = require("./controllers/SpecificDate/FindSpecificDateController");
var ChangeOrderTariffController_1 = require("./controllers/Tariff/ChangeOrderTariffController");
var CreateTariffController_1 = require("./controllers/Tariff/CreateTariffController");
var FindTariffController_1 = require("./controllers/Tariff/FindTariffController");
var GetNumberPIpeController_1 = require("./controllers/Tariff/GetNumberPIpeController");
var ToggleActiveTariffController_1 = require("./controllers/Tariff/ToggleActiveTariffController");
var CreateTariffValueController_1 = require("./controllers/TariffValue/CreateTariffValueController");
var FindTariffValueController_1 = require("./controllers/TariffValue/FindTariffValueController");
var CreateUsersController_1 = require("./controllers/Users/CreateUsersController");
var DeleteUsersController_1 = require("./controllers/Users/DeleteUsersController");
var FindUniqueUserController_1 = require("./controllers/Users/FindUniqueUserController");
var FindUsersController_1 = require("./controllers/Users/FindUsersController");
var LoginUsersController_1 = require("./controllers/Users/LoginUsersController");
var ValidateUsersController_1 = require("./controllers/Users/ValidateUsersController");
var authMiddleware_1 = require("./middlewares/authMiddleware");
var routes = express_1["default"].Router();
var createUser = new CreateUsersController_1.CreateUserController();
var findUser = new FindUsersController_1.FindUserController();
var findUniqueUser = new FindUniqueUserController_1.FindUniqueUserController();
var deleteUser = new DeleteUsersController_1.DeleteUsersController();
var loginUser = new LoginUsersController_1.LoginUsersController();
var validateUser = new ValidateUsersController_1.ValidateUsersController();
var createFood = new CreateFoodController_1.CreateFoodController();
var findFood = new FindFoodController_1.FindFoodController();
var findCategory = new FindCategoryController_1.FindCategoryController();
var createCategory = new CreateCategoryController_1.CreateCategoryController();
var findPet = new FindPetController_1.FindPetController();
var createPet = new CreatePetController_1.CreatePetController();
var findTariff = new FindTariffController_1.FindTariffController();
var createTariff = new CreateTariffController_1.CreateTariffController();
var pipeTariff = new GetNumberPIpeController_1.GetNumberPipeController();
var changeOrderTariff = new ChangeOrderTariffController_1.ChangeOrderTariffController();
var toggleActiveTariff = new ToggleActiveTariffController_1.ToggleActiveTariffController();
var findTariffValue = new FindTariffValueController_1.FindTariffValueController();
var createTariffValue = new CreateTariffValueController_1.CreateTariffValueController();
var findCommonDate = new FindCommonDateController_1.FindCommonDateController();
var createCommonDate = new CreateCommonDateController_1.CreateCommonDateController();
var findSpecificDate = new FindSpecificDateController_1.FindSpecificDateController();
var createSpecificDate = new CreateSpecificDateController_1.CreateSpecificDateController();
var findRequirements = new FindRequirementsController_1.FindRequirementsController();
var findAllHousingUnits = new FindAllHousingUnits_1.FindAllHousingUnits();
var calcBudget = new CalcBudgetController_1.CalcBudgetController();
var calcBudgetDU = new calcBudgetDUcontroller_1.CalcBudgetDUController();
// const changeDeal = new ChangeDealController();
routes.post("/user", createUser.handle);
routes.post("/login", loginUser.handle);
routes.use(authMiddleware_1.authMiddleware);
routes["delete"]("/user", deleteUser.handle);
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
exports["default"] = routes;
//# sourceMappingURL=routes.js.map