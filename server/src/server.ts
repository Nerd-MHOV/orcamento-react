import express from "express";
import routes from "./routes";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error";

require("dotenv").config();

const app = express();
const port = process.env.PORT_SERVER || 3333;

//cors
const whiteList = ["http://localhost:5173", "http://192.168.99.105:5173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whiteList.indexOf(origin) !== -1) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(routes);

//app.use(errorMiddleware);
app.listen(3333, () => {
  console.log("Server is running in " + port);
});
