import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

const app = express();
app.use(morgan("short"));
app.use(helmet());
app.use(compression());

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
