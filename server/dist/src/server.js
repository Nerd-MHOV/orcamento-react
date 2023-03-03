"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
require("dotenv").config();
var app = (0, express_1["default"])();
var port = process.env.PORT_SERVER || 3333;
//cors
var whiteList = [
  "http://localhost:5173",
  "http://192.168.99.105:5173",
  "http://192.168.10.87:81",
];
app.use(
  (0, cors_1["default"])({
    origin: function (origin, callback) {
      if (!origin || whiteList.indexOf(origin) !== -1) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express_1["default"].json());
app.use(routes_1["default"]);
//app.use(errorMiddleware);
app.listen(3333, function () {
  console.log("Server is running in " + port);
});
//# sourceMappingURL=server.js.map
