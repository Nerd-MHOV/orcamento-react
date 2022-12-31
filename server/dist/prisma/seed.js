"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var categories_1 = require("./seeds/categories");
var checkinValues_1 = require("./seeds/checkinValues");
var commonDates_1 = require("./seeds/commonDates");
var duTariff_1 = require("./seeds/duTariff");
var duTariffValues_1 = require("./seeds/duTariffValues");
var food_1 = require("./seeds/food");
var housingUnits_1 = require("./seeds/housingUnits");
var pets_1 = require("./seeds/pets");
var requirements_1 = require("./seeds/requirements");
var specificDates_1 = require("./seeds/specificDates");
var tariffValues_1 = require("./seeds/tariffValues");
var tarrifs_1 = require("./seeds/tarrifs");
var users_1 = require("./seeds/users");
var prismaClient = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, UserSeed_1, user, createdUsers, _a, FoodSeed_1, food, createdFood, _b, CategorySeed_1, category, createdCategory, _c, TariffSeed_1, tariff, createdTariff, _d, CommonDateSeed_1, commonDate, createdDate, _e, SpecificDateSeed_1, specificDate, createdDate, _f, TariffValueSeed_1, tariffValue, tariffId, restTariff, createdValue, _g, CheckSeed_1, checkIn, createdCheckIn, _h, PetSeed_1, pet, createdPet, _j, RequirementSeed_1, requirement, createdRequirement, _k, HUsSeed_1, unit, createdHU, _l, DUtariffSeed_1, dUTariff, createdTariff, _m, DUtariffValuesSeed_1, duTariffValue, createdValue;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    _i = 0, UserSeed_1 = users_1.UserSeed;
                    _o.label = 1;
                case 1:
                    if (!(_i < UserSeed_1.length)) return [3 /*break*/, 4];
                    user = UserSeed_1[_i];
                    return [4 /*yield*/, prismaClient.user.upsert({
                            where: { email: user.email },
                            update: user,
                            create: user
                        })];
                case 2:
                    createdUsers = _o.sent();
                    console.log("created user:" + user.name);
                    _o.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    _a = 0, FoodSeed_1 = food_1.FoodSeed;
                    _o.label = 5;
                case 5:
                    if (!(_a < FoodSeed_1.length)) return [3 /*break*/, 8];
                    food = FoodSeed_1[_a];
                    return [4 /*yield*/, prismaClient.foods.upsert({
                            where: {
                                id: food.id
                            },
                            update: food,
                            create: food
                        })];
                case 6:
                    createdFood = _o.sent();
                    console.log("created price food", food);
                    _o.label = 7;
                case 7:
                    _a++;
                    return [3 /*break*/, 5];
                case 8:
                    _b = 0, CategorySeed_1 = categories_1.CategorySeed;
                    _o.label = 9;
                case 9:
                    if (!(_b < CategorySeed_1.length)) return [3 /*break*/, 12];
                    category = CategorySeed_1[_b];
                    return [4 /*yield*/, prismaClient.categories.upsert({
                            where: { id: category.id },
                            update: category,
                            create: category
                        })];
                case 10:
                    createdCategory = _o.sent();
                    console.log("created category " + category.id);
                    _o.label = 11;
                case 11:
                    _b++;
                    return [3 /*break*/, 9];
                case 12:
                    _c = 0, TariffSeed_1 = tarrifs_1.TariffSeed;
                    _o.label = 13;
                case 13:
                    if (!(_c < TariffSeed_1.length)) return [3 /*break*/, 16];
                    tariff = TariffSeed_1[_c];
                    return [4 /*yield*/, prismaClient.tariff.upsert({
                            where: { name: tariff.name },
                            update: tariff,
                            create: tariff
                        })];
                case 14:
                    createdTariff = _o.sent();
                    _o.label = 15;
                case 15:
                    _c++;
                    return [3 /*break*/, 13];
                case 16:
                    _d = 0, CommonDateSeed_1 = commonDates_1.CommonDateSeed;
                    _o.label = 17;
                case 17:
                    if (!(_d < CommonDateSeed_1.length)) return [3 /*break*/, 20];
                    commonDate = CommonDateSeed_1[_d];
                    return [4 /*yield*/, prismaClient.commonDates.upsert({
                            where: { date: commonDate.date },
                            update: commonDate,
                            create: commonDate
                        })];
                case 18:
                    createdDate = _o.sent();
                    console.log("created common Tariff ", commonDate.date);
                    _o.label = 19;
                case 19:
                    _d++;
                    return [3 /*break*/, 17];
                case 20:
                    _e = 0, SpecificDateSeed_1 = specificDates_1.SpecificDateSeed;
                    _o.label = 21;
                case 21:
                    if (!(_e < SpecificDateSeed_1.length)) return [3 /*break*/, 24];
                    specificDate = SpecificDateSeed_1[_e];
                    return [4 /*yield*/, prismaClient.specificDates.upsert({
                            where: { date: specificDate.date },
                            update: specificDate,
                            create: specificDate
                        })];
                case 22:
                    createdDate = _o.sent();
                    _o.label = 23;
                case 23:
                    _e++;
                    return [3 /*break*/, 21];
                case 24:
                    _f = 0, TariffValueSeed_1 = tariffValues_1.TariffValueSeed;
                    _o.label = 25;
                case 25:
                    if (!(_f < TariffValueSeed_1.length)) return [3 /*break*/, 28];
                    tariffValue = TariffValueSeed_1[_f];
                    tariffId = tariffValue.id, restTariff = __rest(tariffValue, ["id"]);
                    return [4 /*yield*/, prismaClient.tariffValues.upsert({
                            where: { id: tariffId },
                            update: restTariff,
                            create: restTariff
                        })];
                case 26:
                    createdValue = _o.sent();
                    _o.label = 27;
                case 27:
                    _f++;
                    return [3 /*break*/, 25];
                case 28:
                    _g = 0, CheckSeed_1 = checkinValues_1.CheckSeed;
                    _o.label = 29;
                case 29:
                    if (!(_g < CheckSeed_1.length)) return [3 /*break*/, 32];
                    checkIn = CheckSeed_1[_g];
                    return [4 /*yield*/, prismaClient.tariffCheckInValues.upsert({
                            where: { id: checkIn.id },
                            update: checkIn,
                            create: checkIn
                        })];
                case 30:
                    createdCheckIn = _o.sent();
                    console.log("created tariff for" + checkIn.type + checkIn.tariffs_id);
                    _o.label = 31;
                case 31:
                    _g++;
                    return [3 /*break*/, 29];
                case 32:
                    _h = 0, PetSeed_1 = pets_1.PetSeed;
                    _o.label = 33;
                case 33:
                    if (!(_h < PetSeed_1.length)) return [3 /*break*/, 36];
                    pet = PetSeed_1[_h];
                    return [4 /*yield*/, prismaClient.pet.upsert({
                            where: { id: pet.id },
                            update: pet,
                            create: pet
                        })];
                case 34:
                    createdPet = _o.sent();
                    console.log("created price for pet " + pet.carrying);
                    _o.label = 35;
                case 35:
                    _h++;
                    return [3 /*break*/, 33];
                case 36:
                    _j = 0, RequirementSeed_1 = requirements_1.RequirementSeed;
                    _o.label = 37;
                case 37:
                    if (!(_j < RequirementSeed_1.length)) return [3 /*break*/, 40];
                    requirement = RequirementSeed_1[_j];
                    return [4 /*yield*/, prismaClient.requirement.upsert({
                            where: { id: requirement.id },
                            update: requirement,
                            create: requirement
                        })];
                case 38:
                    createdRequirement = _o.sent();
                    _o.label = 39;
                case 39:
                    _j++;
                    return [3 /*break*/, 37];
                case 40:
                    _k = 0, HUsSeed_1 = housingUnits_1.HUsSeed;
                    _o.label = 41;
                case 41:
                    if (!(_k < HUsSeed_1.length)) return [3 /*break*/, 44];
                    unit = HUsSeed_1[_k];
                    return [4 /*yield*/, prismaClient.hUs.upsert({
                            where: { id: unit.id },
                            update: unit,
                            create: unit
                        })];
                case 42:
                    createdHU = _o.sent();
                    console.log("Housing unit created: " + unit.id);
                    _o.label = 43;
                case 43:
                    _k++;
                    return [3 /*break*/, 41];
                case 44:
                    _l = 0, DUtariffSeed_1 = duTariff_1.DUtariffSeed;
                    _o.label = 45;
                case 45:
                    if (!(_l < DUtariffSeed_1.length)) return [3 /*break*/, 48];
                    dUTariff = DUtariffSeed_1[_l];
                    return [4 /*yield*/, prismaClient.dUTariff.upsert({
                            where: { name: dUTariff.name },
                            update: dUTariff,
                            create: dUTariff
                        })];
                case 46:
                    createdTariff = _o.sent();
                    console.log("tariff Day Use" + dUTariff.name + " created");
                    _o.label = 47;
                case 47:
                    _l++;
                    return [3 /*break*/, 45];
                case 48:
                    _m = 0, DUtariffValuesSeed_1 = duTariffValues_1.DUtariffValuesSeed;
                    _o.label = 49;
                case 49:
                    if (!(_m < DUtariffValuesSeed_1.length)) return [3 /*break*/, 52];
                    duTariffValue = DUtariffValuesSeed_1[_m];
                    return [4 /*yield*/, prismaClient.dUTariffValues.upsert({
                            where: { id: duTariffValue.id },
                            update: duTariffValue,
                            create: duTariffValue
                        })];
                case 50:
                    createdValue = _o.sent();
                    console.log("value for " + createdValue.tariff_id + " created");
                    _o.label = 51;
                case 51:
                    _m++;
                    return [3 /*break*/, 49];
                case 52: return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.error(e);
        process.exit(1);
        return [2 /*return*/];
    });
}); })["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=seed.js.map