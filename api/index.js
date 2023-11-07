import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MOngo Conencted");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("app is running on prot 3000");
});

app.use("/api/user", userRouter);
