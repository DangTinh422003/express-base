import app from "./src/app.js";

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
