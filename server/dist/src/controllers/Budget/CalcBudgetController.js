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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.CalcBudgetController = void 0;
var date_fns_1 = require("date-fns");
var adultBudget_1 = require("./functions/adultBudget");
var childBudget_1 = require("./functions/childBudget");
var discountBudget_1 = require("./functions/discountBudget");
var petBudget_1 = require("./functions/petBudget");
var requirementBudget_1 = require("./functions/requirementBudget");
var CalcBudgetController = /** @class */ (function () {
    function CalcBudgetController() {
    }
    CalcBudgetController.prototype.handle = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, arrForm, arrChild, arrPet, arrRequirement, rangeDate, adultRows, childRows, petRows, requirementRows, discountRow, initDate, finalDate, completeRows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, arrForm = _a.arrForm, arrChild = _a.arrChild, arrPet = _a.arrPet, arrRequirement = _a.arrRequirement, rangeDate = _a.rangeDate;
                        console.log(arrForm.category);
                        adultRows = [];
                        childRows = [];
                        petRows = [];
                        requirementRows = [];
                        discountRow = [];
                        initDate = new Date(rangeDate.startDate);
                        finalDate = new Date(rangeDate.endDate);
                        finalDate = (0, date_fns_1.addDays)(finalDate, 1);
                        return [4 /*yield*/, (0, adultBudget_1.adultBudget)(arrForm, arrChild, initDate, finalDate)];
                    case 1:
                        //adult
                        adultRows = _b.sent();
                        return [4 /*yield*/, (0, childBudget_1.childBudget)(arrChild, arrForm, initDate, finalDate)];
                    case 2:
                        //child
                        childRows = _b.sent();
                        return [4 /*yield*/, (0, petBudget_1.petBudget)(arrPet, initDate, finalDate, arrForm)];
                    case 3:
                        //pet
                        petRows = _b.sent();
                        return [4 /*yield*/, (0, requirementBudget_1.requirementBudget)(initDate, finalDate, arrForm, arrRequirement)];
                    case 4:
                        //requirement
                        requirementRows = _b.sent();
                        return [4 /*yield*/, (0, discountBudget_1.discountBudget)(arrForm, arrChild, initDate, finalDate)];
                    case 5:
                        //discountRow
                        discountRow = _b.sent();
                        completeRows = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], adultRows, true), childRows, true), petRows, true), requirementRows, true), discountRow, true);
                        return [2 /*return*/, response.json({
                                rows: completeRows
                            })];
                }
            });
        });
    };
    return CalcBudgetController;
}());
exports.CalcBudgetController = CalcBudgetController;
//# sourceMappingURL=CalcBudgetController.js.map