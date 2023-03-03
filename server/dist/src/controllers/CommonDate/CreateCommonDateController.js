"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.CreateCommonDateController = void 0;
var prismaClient_1 = require("../../database/prismaClient");
var CreateCommonDateController = /** @class */ (function () {
    function CreateCommonDateController() {
    }
    CreateCommonDateController.prototype.handle = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var tariffs, first, second, _a, firstFoodId, _, firstFood, earlyWithoutIds, valuesWithoutId, _b, secondFoodId, _secondTariffId, secondFood, secondEarlyWithoutIds, secondValuesWithoutId, _c, firstCreate, secondCreate, commonCreate, err_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        tariffs = request.body.tariffs;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        first = tariffs[0];
                        second = tariffs[1];
                        _a = first.food, firstFoodId = _a.id, _ = _a.tariffs_id, firstFood = __rest(_a, ["id", "tariffs_id"]);
                        earlyWithoutIds = first.TariffCheckInValues.map(function (value) {
                            var idEarly = value.id, _ = value.tariffs_id, rest = __rest(value, ["id", "tariffs_id"]);
                            return rest;
                        });
                        valuesWithoutId = first.TariffValues.map(function (value) {
                            var idValue = value.id, _ = value.tariffs_id, rest = __rest(value, ["id", "tariffs_id"]);
                            return rest;
                        });
                        _b = second.food, secondFoodId = _b.id, _secondTariffId = _b.tariffs_id, secondFood = __rest(_b, ["id", "tariffs_id"]);
                        secondEarlyWithoutIds = second.TariffCheckInValues.map(function (value) {
                            var idEarly = value.id, _ = value.tariffs_id, rest = __rest(value, ["id", "tariffs_id"]);
                            return rest;
                        });
                        secondValuesWithoutId = second.TariffValues.map(function (value) {
                            var idValue = value.id, _ = value.tariffs_id, rest = __rest(value, ["id", "tariffs_id"]);
                            return rest;
                        });
                        console.log("HERE", second.food);
                        return [4 /*yield*/, prismaClient_1.prismaClient.$transaction([
                                prismaClient_1.prismaClient.tariff.create({
                                    data: {
                                        name: first.name,
                                        product_pipe: first.product_pipe,
                                        active: first.active,
                                        food: {
                                            connectOrCreate: {
                                                where: { id: firstFoodId },
                                                create: __assign({}, firstFood)
                                            }
                                        },
                                        TariffCheckInValues: {
                                            createMany: {
                                                data: earlyWithoutIds
                                            }
                                        },
                                        TariffValues: {
                                            createMany: {
                                                data: valuesWithoutId
                                            }
                                        }
                                    }
                                }),
                                prismaClient_1.prismaClient.tariff.create({
                                    data: {
                                        name: second.name,
                                        product_pipe: second.product_pipe,
                                        active: second.active,
                                        food: {
                                            connectOrCreate: {
                                                where: { id: secondFoodId },
                                                create: __assign({}, secondFood)
                                            }
                                        },
                                        TariffCheckInValues: {
                                            createMany: {
                                                data: secondEarlyWithoutIds
                                            }
                                        },
                                        TariffValues: {
                                            createMany: {
                                                data: secondValuesWithoutId
                                            }
                                        }
                                    }
                                }),
                                prismaClient_1.prismaClient.commonDates.createMany({
                                    data: first.tariffs_to_midweek
                                }),
                            ])];
                    case 2:
                        _c = _d.sent(), firstCreate = _c[0], secondCreate = _c[1], commonCreate = _c[2];
                        console.log("============================================");
                        console.log({ firstCreate: firstCreate, secondCreate: secondCreate, commonCreate: commonCreate });
                        return [2 /*return*/, response.json({
                                msg: "success",
                                debug: { firstCreate: firstCreate, secondCreate: secondCreate, commonCreate: commonCreate }
                            })];
                    case 3:
                        err_1 = _d.sent();
                        console.log("============================================");
                        console.log(err_1);
                        console.log("============================================");
                        return [2 /*return*/, response.json({ msg: "error", debug: err_1 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CreateCommonDateController;
}());
exports.CreateCommonDateController = CreateCommonDateController;
//# sourceMappingURL=CreateCommonDateController.js.map