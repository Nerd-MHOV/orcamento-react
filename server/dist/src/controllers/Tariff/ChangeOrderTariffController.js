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
exports.ChangeOrderTariffController = void 0;
var prismaClient_1 = require("../../database/prismaClient");
var ChangeOrderTariffController = /** @class */ (function () {
    function ChangeOrderTariffController() {
    }
    ChangeOrderTariffController.prototype.handle = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, side, order_id, tariffs, maxValue, minValue, firstTariff, secondTariff;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, side = _a.side, order_id = _a.order_id;
                        return [4 /*yield*/, prismaClient_1.prismaClient.tariff.findMany({
                                orderBy: {
                                    order_id: "asc"
                                }
                            })];
                    case 1:
                        tariffs = _b.sent();
                        maxValue = tariffs.reduce(function (prev, current) {
                            return prev.order_id > current.order_id ? prev : current;
                        });
                        minValue = tariffs.reduce(function (prev, current) {
                            return prev.order_id < current.order_id ? prev : current;
                        });
                        firstTariff = tariffs.filter(function (tariff) { return tariff.order_id === order_id; })[0];
                        if (side === "up" && firstTariff.order_id === maxValue.order_id) {
                            return [2 /*return*/, response.json("Essa tarifa esta no topo")];
                        }
                        if (side === "down" && firstTariff.order_id === minValue.order_id) {
                            return [2 /*return*/, response.json("Essa tarifa não desce mais!")];
                        }
                        secondTariff = side === "up"
                            ? tariffs.filter(function (tariff) { return tariff.order_id > order_id; })[0]
                            : tariffs.filter(function (tariff) { return tariff.order_id < order_id; })[0];
                        return [4 /*yield*/, prismaClient_1.prismaClient.tariff.update({
                                where: { name: firstTariff.name },
                                data: {
                                    order_id: secondTariff.order_id
                                }
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.tariff.update({
                                where: { name: secondTariff.name },
                                data: {
                                    order_id: firstTariff.order_id
                                }
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, response.json({
                                firstTariff: firstTariff,
                                secondTariff: secondTariff
                            })];
                }
            });
        });
    };
    return ChangeOrderTariffController;
}());
exports.ChangeOrderTariffController = ChangeOrderTariffController;
//# sourceMappingURL=ChangeOrderTariffController.js.map