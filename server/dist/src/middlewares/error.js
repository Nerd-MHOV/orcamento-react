"use strict";
exports.__esModule = true;
exports.errorMiddleware = void 0;
var errorMiddleware = function (error, request, response, next) {
    var _a;
    var statusCode = (_a = error.statusCode) !== null && _a !== void 0 ? _a : 500;
    var message = error.statusCode ? error.message : "Internal Server Error";
    return response.status(statusCode).json({ message: message });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.js.map