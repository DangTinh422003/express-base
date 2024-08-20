import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { instanceDb } from "./dbs/init.mongodb.js";
import router from "./routes/index.js";
import "dotenv/config";

const app = express();
app.use(morgan("short"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init db
instanceDb.connect();

// init routes
app.use(router);

export default app;
