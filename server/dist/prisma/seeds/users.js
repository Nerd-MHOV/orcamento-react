"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.UserSeed = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
exports.UserSeed = [
    {
        id: 1,
        email: "matheus.henrique4245@gmail.com",
        phone: "14 991578451",
        name: "Matheus Henrique",
        username: "admin",
        password: bcrypt_1["default"].hashSync("admin", 10),
        token_pipe: "0b89d278f9d3debfe30b08cb441f295f84832371",
        user_pipe: "3183119"
    },
];
//# sourceMappingURL=users.js.map