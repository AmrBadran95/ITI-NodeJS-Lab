const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./Routers/post");
const dotenv = require("dotenv");
const userRouter = require("./Routers/user");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;
const mongooseConnection =
  process.env.DB_URL || "mongodb://localhost:27017/ITI-NodeJS-Labs";

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  mongoose
    .connect(mongooseConnection)
    .then(() => {
      console.log("Connected to database successfully");
    })
    .catch((error) => {
      console.log("Connection to database failed", error);
    });
});
