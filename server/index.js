const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/user");
const weatherRouter = require("./routers/weather");
require("./db/db");

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(weatherRouter);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
