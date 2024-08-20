import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { instanceDb } from "./dbs/init.mongodb.js";
import "dotenv/config";

const app = express();
app.use(morgan("short"));
app.use(helmet());
app.use(compression());

instanceDb.connect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
