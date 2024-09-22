import express from "express";

import {
  QUESTIONS,
  QUESTION,
  DELETE_QUESTION,
} from "../controller/question.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/questions", auth, QUESTIONS);
router.post("/question", auth, QUESTION);
router.delete("/question/:id", auth, DELETE_QUESTION);

export default router;
