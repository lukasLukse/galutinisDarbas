import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import usersRouter from "./src/router/user.js";
import questionsRouter from "./src/router/question.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err);
  });

app.use(usersRouter);
app.use(questionsRouter);

app.use((req, res) => {
  return res.status(404).json({ message: "This endpoint doesn't exist." });
});

app.listen(process.env.PORT, () => {
  console.log(`Your app is started on port ${process.env.PORT}`);
});
