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
exports.__esModule = true;
exports.generateBudgetRequirement = void 0;
var date_fns_1 = require("date-fns");
var prismaClient_1 = require("../../../database/prismaClient");
var getTariff_1 = require("./getTariff");
var daysOfWeekend = ["Fri", "Sat", "Sun"];
function generateBudgetRequirement(initDate, finalDate, arrForm, arrRequirement) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var requirement, typeRequirement, values, valuesBudget, firstDate, dayMonthYear, monthYear, dayWeek, month, tariffBudget, tariffValues, typeCheck, adultValues, childValues, tariffWeek, tariff, amountAdults, countAdult, amountChild, countChild, numChild, uChild, tariff, tariff;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    requirement = arrRequirement.requirement;
                    typeRequirement = arrRequirement.type;
                    values = arrRequirement.values;
                    valuesBudget = [];
                    firstDate = initDate;
                    _c.label = 1;
                case 1:
                    if (!(initDate < finalDate)) return [3 /*break*/, 8];
                    dayMonthYear = (0, date_fns_1.format)(initDate, "yyyy-MM-dd");
                    monthYear = (0, date_fns_1.format)(initDate, "yyyy-MM");
                    dayWeek = (0, date_fns_1.format)(initDate, "E");
                    month = (0, date_fns_1.format)(initDate, "MM");
                    tariffBudget = 0;
                    if (!(initDate === firstDate)) return [3 /*break*/, 7];
                    if (!(typeRequirement === "person")) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, getTariff_1.getTariff)(dayMonthYear, monthYear)];
                case 2:
                    tariffValues = _c.sent();
                    typeCheck = "";
                    adultValues = 0;
                    childValues = 0;
                    if (requirement.match(/10h/)) {
                        typeCheck = "10h";
                    }
                    if (requirement.match(/12h/)) {
                        typeCheck = "12h";
                    }
                    tariffWeek = "";
                    if (daysOfWeekend.includes(dayWeek) ||
                        (dayWeek === "Thu" && (month === "07" || month === "01"))) {
                        tariffWeek = (_a = tariffValues.tariff_we_id) !== null && _a !== void 0 ? _a : "";
                    }
                    else {
                        tariffWeek = (_b = tariffValues.tariff_mw_id) !== null && _b !== void 0 ? _b : "";
                    }
                    return [4 /*yield*/, prismaClient_1.prismaClient.tariffCheckInValues.findFirst({
                            where: {
                                AND: {
                                    tariffs_id: tariffWeek,
                                    type: typeCheck
                                }
                            }
                        })];
                case 3:
                    tariff = _c.sent();
                    if (tariff) {
                        amountAdults = values.adult;
                        countAdult = 0;
                        while (countAdult < amountAdults) {
                            countAdult++;
                            if (countAdult <= 2) {
                                adultValues += tariff.adt;
                            }
                            else {
                                adultValues += tariff.adtex;
                            }
                        }
                        amountChild = values.child.length;
                        values.child.sort(function (a, b) { return a - b; });
                        for (countChild = 0; countChild < values.child.length; countChild++) {
                            numChild = countChild + 1;
                            uChild = Number(values.child[countChild]);
                            if (uChild <= 3 && numChild === 1)
                                childValues += tariff.chd0;
                            else if ((uChild > 3 && uChild < 8) || (uChild < 8 && numChild > 1))
                                childValues += tariff.chd4;
                            else
                                childValues += tariff.chd8;
                        }
                        tariffBudget = adultValues + childValues;
                    }
                    return [3 /*break*/, 7];
                case 4:
                    if (!(typeRequirement === "voucher")) return [3 /*break*/, 5];
                    tariff = 2;
                    tariffBudget = tariff * values.amount;
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, prismaClient_1.prismaClient.requirement.findUnique({
                        where: {
                            name: requirement
                        }
                    })];
                case 6:
                    tariff = _c.sent();
                    if (tariff)
                        tariffBudget = tariff.price * values.amount;
                    _c.label = 7;
                case 7:
                    valuesBudget.push(tariffBudget);
                    initDate = (0, date_fns_1.addDays)(initDate, 1);
                    return [3 /*break*/, 1];
                case 8: return [2 /*return*/, valuesBudget];
            }
        });
    });
}
exports.generateBudgetRequirement = generateBudgetRequirement;
//# sourceMappingURL=generateBudgetRequirement.js.map