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
exports.CreateUserController = void 0;
var prismaClient_1 = require("../../database/prismaClient");
var bcrypt_1 = __importDefault(require("bcrypt"));
var CreateUserController = /** @class */ (function () {
    function CreateUserController() {
    }
    CreateUserController.prototype.handle = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, phone, username, token_pipe, user_pipe;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, email = _a.email, password = _a.password, phone = _a.phone, username = _a.username, token_pipe = _a.token_pipe, user_pipe = _a.user_pipe;
                        return [4 /*yield*/, bcrypt_1["default"]
                                .hash(password, 10)
                                .then(function (hashPassword) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, prismaClient_1.prismaClient.user.create({
                                                data: {
                                                    name: name,
                                                    email: email,
                                                    password: hashPassword,
                                                    phone: phone,
                                                    username: username,
                                                    token_pipe: token_pipe,
                                                    user_pipe: user_pipe
                                                }
                                            })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })
                                .then(function (newUser) {
                                var _ = newUser.password, user = __rest(newUser, ["password"]);
                                return response.json(user);
                            })["catch"](function (err) {
                                var _a, _b, _c;
                                var message = "Erro interno do servidor";
                                if (((_a = err.meta) === null || _a === void 0 ? void 0 : _a.target[0]) === "username")
                                    message = "Esse username já esta sendo usado!";
                                if (((_b = err.meta) === null || _b === void 0 ? void 0 : _b.target[0]) === "email")
                                    message = "Esse email já esta sendo usado!";
                                if (((_c = err.meta) === null || _c === void 0 ? void 0 : _c.target[0]) === "name")
                                    message = "Esse colaborador já foi cadastrado!";
                                return response.status(500).json({
                                    err: err,
                                    message: {
                                        type: "error",
                                        message: message,
                                        debug: err
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
    return CreateUserController;
}());
exports.CreateUserController = CreateUserController;
//# sourceMappingURL=CreateUsersController.js.map