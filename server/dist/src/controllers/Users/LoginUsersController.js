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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.LoginUsersController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var prismaClient_1 = require("../../database/prismaClient");
var bcrypt_1 = __importDefault(require("bcrypt"));
var LoginUsersController = /** @class */ (function () {
    function LoginUsersController() {
    }
    LoginUsersController.prototype.handle = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, username = _a.username, password = _a.password;
                        if (!username || !password) {
                            return [2 /*return*/, response.status(201).json({
                                    message: {
                                        type: 'error',
                                        message: 'Informe o Usuario e a Senha!'
                                    }
                                })];
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.user
                                .findFirstOrThrow({
                                where: {
                                    username: username
                                }
                            })
                                .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var verifyPassword;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, bcrypt_1["default"].compare(password, user.password)];
                                        case 1:
                                            verifyPassword = _a.sent();
                                            if (!verifyPassword) {
                                                throw new Error("Usuario ou senhas incorretos!");
                                            }
                                            return [2 /*return*/, user];
                                    }
                                });
                            }); })
                                .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var token, _, userLogin;
                                return __generator(this, function (_a) {
                                    token = jsonwebtoken_1["default"].sign({ id: user.id }, process.env.JWT_PASS || 'hash', {
                                        expiresIn: "8h"
                                    });
                                    _ = user.password, userLogin = __rest(user, ["password"]);
                                    return [2 /*return*/, response.json({
                                            user: userLogin,
                                            token: token,
                                            message: {
                                                type: 'success',
                                                message: 'Logado com sucesso!'
                                            }
                                        })];
                                });
                            }); })["catch"](function (err) {
                                return response.json({
                                    err: err,
                                    message: {
                                        type: "error",
                                        message: "Usuario ou senhas incorretos!"
                                    }
                                });
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LoginUsersController;
}());
exports.LoginUsersController = LoginUsersController;
//# sourceMappingURL=LoginUsersController.js.map