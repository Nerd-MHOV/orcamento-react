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
exports.GetNumberPipeController = void 0;
var date_fns_1 = require("date-fns");
var getTariff_1 = require("../Budget/functions/getTariff");
var GetNumberPipeController = /** @class */ (function () {
    function GetNumberPipeController() {
    }
    GetNumberPipeController.prototype.handle = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, date_in, date_out, numberPipe, tariff, date, dateOut, type, dayMonthYear, monthYear, tariffs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, date_in = _a.date_in, date_out = _a.date_out;
                        numberPipe = 0;
                        tariff = {};
                        date = new Date(date_in);
                        dateOut = new Date(date_out);
                        type = "";
                        _b.label = 1;
                    case 1:
                        if (!(date < dateOut)) return [3 /*break*/, 3];
                        dayMonthYear = (0, date_fns_1.format)(date, "yyyy-MM-dd");
                        monthYear = (0, date_fns_1.format)(date, "yyyy-MM");
                        return [4 /*yield*/, (0, getTariff_1.getTariff)(dayMonthYear, monthYear)];
                    case 2:
                        tariffs = _b.sent();
                        if (tariffs.type === "specific") {
                            tariff = tariffs.tariff_we;
                            type = "isHoliday";
                        }
                        if ((0, date_fns_1.isWeekend)(date) && type !== "isHoliday") {
                            tariff = tariffs.tariff_we;
                            type = "isWeekend";
                        }
                        if (!(0, date_fns_1.isWeekend)(date) && type !== "isHoliday" && type !== "isWeekend") {
                            tariff = tariffs.tariff_mw;
                            type = "isCommon";
                        }
                        date = (0, date_fns_1.addDays)(date, 1);
                        return [3 /*break*/, 1];
                    case 3:
                        if ((0, date_fns_1.format)(date, "yyyy-MM-dd") === (0, date_fns_1.format)(dateOut, "yyyy-MM-dd")) {
                            tariff = {
                                product_pipe: "46"
                            };
                        }
                        return [2 /*return*/, response.json(tariff)];
                }
            });
        });
    };
    return GetNumberPipeController;
}());
exports.GetNumberPipeController = GetNumberPipeController;
//# sourceMappingURL=GetNumberPIpeController.js.map